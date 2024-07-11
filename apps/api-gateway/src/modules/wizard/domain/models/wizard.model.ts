import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

import { BaseModel } from '../../../../shared/base/base-model/base-model';
import { IWizard } from '../interfaces/wizard.interface';

export class WizardModel extends BaseModel implements IWizard {
  @ApiProperty()
  @IsUUID()
  public questionnaireId: string;

  @ApiProperty()
  @IsBoolean()
  public completed: boolean;
}
