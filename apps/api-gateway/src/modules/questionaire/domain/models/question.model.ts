import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

import { BaseModel } from '../../../../shared/base/base-model/base-model';
import { IQuestion, QuestionType } from '../interfaces';

export class QuestionModel extends BaseModel implements IQuestion {
  @ApiProperty()
  @IsNumber()
  public orderId: number;

  @ApiProperty()
  @IsNumber()
  public stepId: number;

  @ApiProperty()
  @IsString()
  public text: string;

  @ApiProperty({ enum: QuestionType, enumName: 'QuestionType' })
  @IsEnum(QuestionType)
  public type: QuestionType;

  @ApiProperty()
  @IsArray()
  public options: string[];

  @ApiProperty()
  @IsBoolean()
  public deleted: boolean;
}
