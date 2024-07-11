import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { filterFields } from '../../../../shared/utils/filter-fields';

export class ProgressDto {
  @ApiProperty()
  @IsNumber()
  public total: number;

  @ApiProperty()
  @IsNumber()
  public completed: number;

  public constructor(partial: Partial<ProgressDto> = {}) {
    Object.assign(this, filterFields(partial, ['total', 'completed']));
  }
}
