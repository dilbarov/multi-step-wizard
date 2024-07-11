import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';

import { filterFields } from '../../../../shared/utils/filter-fields';
import { PublicStepGetDto } from '../../../questionaire/domain/dto';
import { ProgressDto } from './progress.dto';

const keys: Array<keyof PublicStepGetDto> = ['questions'];

export class WizardStepConfigDto extends PickType(PublicStepGetDto, keys) {
  @ApiProperty()
  @IsUUID()
  public wizardId: string;

  @ApiProperty()
  @IsNumber({ allowNaN: true })
  public stepId: number | null;

  @ApiProperty()
  @Type(() => ProgressDto)
  @ValidateNested()
  public progress: ProgressDto;

  public constructor(partial: Partial<WizardStepConfigDto>) {
    super();
    Object.assign(this, filterFields(partial, [...keys, 'progress', 'stepId', 'wizardId']));
  }
}
