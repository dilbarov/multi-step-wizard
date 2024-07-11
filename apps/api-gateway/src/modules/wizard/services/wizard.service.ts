import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnswerCreateDto } from '../../answer/domain/dto/answer.create.dto';
import { IAnswer } from '../../answer/domain/interfaces/answer.interface';
import { AnswerService } from '../../answer/services/answer.service';
import { QuestionnaireService } from '../../questionaire/services/questionnaire.service';
import { WizardStepConfigDto } from '../domain/dto/wizard-step-config.dto';
import { WizardEntity } from '../entities/wizard.entity';

@Injectable()
export class WizardService {
  public constructor(
    @InjectRepository(WizardEntity) private readonly wizardRepository: Repository<WizardEntity>,
    private readonly questionnaireService: QuestionnaireService,
    private readonly answerService: AnswerService,
  ) {}

  public async startWizard(questionnaireId: string): Promise<WizardStepConfigDto> {
    const wizard = new WizardEntity();
    wizard.questionnaireId = questionnaireId;
    wizard.completed = false;

    await this.wizardRepository.save(wizard);
    return await this.getStepConfig(wizard.id, 1);
  }

  public async submitStep(wizardId: string, stepId: number, answers: AnswerCreateDto[]): Promise<WizardStepConfigDto> {
    const wizard = await this._getWizard(wizardId);

    if (!wizard) {
      throw new NotFoundException(`Wizard with id "${wizardId}" not found`);
    }

    if (wizard.completed) {
      throw new BadRequestException('Wizard has already completed');
    }

    const currentStep = await this.getStepConfig(wizardId, stepId);

    const questionsMap = answers.reduce<Map<string, IAnswer>>((acc, answer) => {
      acc.set(answer.questionId, answer);
      return acc;
    }, new Map());

    let isValid = true;

    for (const question of currentStep.questions) {
      if (!questionsMap.has(question.id)) {
        isValid = false;
        break;
      }

      if (!QuestionnaireService.validateAnswer(questionsMap.get(question.id).answer, question)) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      throw new BadRequestException('Invalid answers');
    }

    for (const answer of answers) {
      await this.answerService.createAnswer(wizardId, answer.questionId, answer.answer);
    }

    const nextStep = await this.getStepConfig(wizardId, stepId + 1);

    if (!nextStep) {
      wizard.completed = true;
      await this.wizardRepository.save(wizard);
      return new WizardStepConfigDto({
        wizardId,
        stepId: null,
        questions: [],
        progress: {
          total: currentStep.progress.total,
          completed: currentStep.progress.total,
        },
      });
    }
    return nextStep;
  }

  public async getStepConfig(wizardId: string, stepId: number): Promise<WizardStepConfigDto | null> {
    const wizard = await this._getWizard(wizardId);

    if (!wizard) {
      throw new NotFoundException(`Wizard with id "${wizardId}" not found`);
    }

    const steps = await this.questionnaireService.getSteps(wizard.questionnaireId);

    if (stepId > steps.length) {
      return null;
    }

    const answers = await this.answerService.getAnswersByWizard(wizardId);
    const answersMap = new Map(answers.map(answer => [answer.questionId, answer]));

    const completedSteps = steps.reduce<number>((acc, current) => {
      if (current.questions.every(question => answersMap.has(question.id))) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const currentStep = steps[stepId - 1];

    return new WizardStepConfigDto({
      wizardId,
      stepId: currentStep.stepId,
      questions: currentStep.questions,
      progress: { total: steps.length, completed: completedSteps },
    });
  }

  private async _getWizard(wizardId: string): Promise<WizardEntity | null> {
    return await this.wizardRepository.findOne({ where: { id: wizardId } });
  }
}
