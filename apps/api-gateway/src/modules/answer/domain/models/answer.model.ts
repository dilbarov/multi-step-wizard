import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsUUID } from 'class-validator';

import { BaseModel } from '../../../../shared/base/base-model/base-model';
import { IAnswer, IAnswerValue } from '../interfaces/answer.interface';

export class AnswerModel extends BaseModel implements IAnswer {
  @ApiProperty()
  @IsUUID()
  public wizardId: string;

  @ApiProperty()
  @IsUUID()
  public questionId: string;

  @ApiProperty()
  @IsObject()
  public answer: IAnswerValue;
}
