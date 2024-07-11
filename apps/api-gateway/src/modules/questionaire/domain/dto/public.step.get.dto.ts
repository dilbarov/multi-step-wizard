import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

import { filterFields } from '../../../../shared/utils/filter-fields';
import { PublicQuestionGetDto } from './public.question.get.dto';

export class PublicStepGetDto {
  @ApiProperty()
  @IsNumber()
  public stepId: number;

  @ApiProperty()
  @IsArray()
  @Type(() => PublicQuestionGetDto)
  @ValidateNested({ each: true })
  public questions: PublicQuestionGetDto[];

  public constructor(partial: Partial<PublicStepGetDto> = {}) {
    Object.assign(this, filterFields<PublicStepGetDto>(partial, ['stepId', 'questions']));
  }
}
