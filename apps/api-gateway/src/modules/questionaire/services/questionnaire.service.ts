import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAnswerValue } from '../../answer/domain/interfaces/answer.interface';
import { PublicQuestionGetDto, PublicQuestionnaireGetDto, PublicStepGetDto } from '../domain/dto';
import { IQuestion, QuestionType } from '../domain/interfaces';
import { QuestionEntity, QuestionnaireEntity } from '../entities';

@Injectable()
export class QuestionnaireService {
  public constructor(
    @InjectRepository(QuestionnaireEntity) private readonly questionnaireRepository: Repository<QuestionnaireEntity>,
    @InjectRepository(QuestionEntity) private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  public async getQuestionnaires(): Promise<PublicQuestionnaireGetDto[]> {
    const items = await this.questionnaireRepository.find({
      order: {
        title: 'ASC',
      },
    });

    return items.map(item => new PublicQuestionnaireGetDto(item));
  }

  public async getQuestionnaire(questionnaireId: string): Promise<PublicQuestionnaireGetDto> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: {
        id: questionnaireId,
      },
    });

    if (!questionnaire) {
      throw new Error(`Questionnaire with id "${questionnaireId}" not found.`);
    }

    return new PublicQuestionnaireGetDto(questionnaire);
  }

  public async getSteps(questionnaireId: string): Promise<PublicStepGetDto[]> {
    const questions = await this.questionRepository.find({
      where: {
        questionnaire: {
          id: questionnaireId,
        },
      },
      order: {
        orderId: 'ASC',
      },
    });

    const questionsMap = questions.reduce<Map<number, PublicQuestionGetDto[]>>((acc, question) => {
      if (!acc.has(question.stepId)) {
        acc.set(question.stepId, []);
      }

      acc.get(question.stepId).push(new PublicQuestionGetDto(question));

      return acc;
    }, new Map<number, PublicQuestionGetDto[]>());

    return Array.from(questionsMap.entries()).map(([stepId, questions]) => {
      return new PublicStepGetDto({
        stepId,
        questions,
      });
    });
  }

  public static validateAnswer(answer: IAnswerValue, question: IQuestion): boolean {
    switch (question.type) {
      case QuestionType.SINGLE_CHOICE:
        return question.options.includes(answer.value as string);
      case QuestionType.MULTI_CHOICE:
        return Array.isArray(answer.value) && answer.value.every(option => question.options.includes(option));
      case QuestionType.INPUT:
        return typeof answer.value === 'string' && answer.value.trim() !== '';
      case QuestionType.NUMERIC:
        return typeof answer.value === 'number' && !isNaN(answer.value);
    }
  }
}
