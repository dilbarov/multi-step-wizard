import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseModel } from '../../../../shared/base/base-model/base-model';
import { IQuestionnaire } from '../interfaces';

export class QuestionnaireModel extends BaseModel implements IQuestionnaire {
  @ApiProperty({ example: 'Title', description: 'The title of the questionnaire' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public title: string;
}
