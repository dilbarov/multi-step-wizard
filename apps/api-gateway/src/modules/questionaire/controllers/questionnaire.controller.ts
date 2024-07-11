import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

import { UuidPipe } from '../../../shared/pipes/uuid.pipe';
import { PublicQuestionnaireGetDto, PublicStepGetDto } from '../domain/dto';
import { QuestionnaireService } from '../services/questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  public constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  @ApiOperation({ summary: 'Getting the list of questionnaires' })
  public async getQuestionnaires(): Promise<PublicQuestionnaireGetDto[]> {
    return await this.questionnaireService.getQuestionnaires();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Getting a specific questionnaire' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'The ID of the questionnaire' })
  public async getQuestionnaire(@Param('id', UuidPipe) id: string): Promise<PublicQuestionnaireGetDto> {
    return await this.questionnaireService.getQuestionnaire(id);
  }

  @Get(':id/steps')
  @ApiOperation({ summary: 'Getting the list of steps for a specific questionnaire' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'The ID of the questionnaire' })
  public async getSteps(@Param('id', UuidPipe) id: string): Promise<PublicStepGetDto[]> {
    return await this.questionnaireService.getSteps(id);
  }
}
