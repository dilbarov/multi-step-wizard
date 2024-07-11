import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { UuidPipe } from '../../../shared/pipes/uuid.pipe';
import { AnswerCreateDto } from '../../answer/domain/dto/answer.create.dto';
import { WizardStepConfigDto } from '../domain/dto/wizard-step-config.dto';
import { WizardService } from '../services/wizard.service';

@Controller('wizard')
export class WizardController {
  public constructor(private readonly wizardService: WizardService) {}

  @Post('start')
  public async startWizard(@Body('questionnaireId', UuidPipe) questionnaireId: string): Promise<WizardStepConfigDto> {
    return await this.wizardService.startWizard(questionnaireId);
  }

  @Get(':wizardId/step/:stepId')
  public async getStepConfig(
    @Param('wizardId', UuidPipe) wizardId: string,
    @Param('stepId', ParseIntPipe) stepId: number,
  ): Promise<WizardStepConfigDto | null> {
    return await this.wizardService.getStepConfig(wizardId, stepId);
  }

  @Post(':wizardId/step/:stepId')
  public async submitStep(
    @Param('wizardId', UuidPipe) wizardId: string,
    @Param('stepId', ParseIntPipe) stepId: number,
    @Body('answers') answers: AnswerCreateDto[],
  ): Promise<WizardStepConfigDto> {
    return await this.wizardService.submitStep(wizardId, stepId, answers);
  }
}
