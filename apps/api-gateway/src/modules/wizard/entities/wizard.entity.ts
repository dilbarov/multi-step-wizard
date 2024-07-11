import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base-entity/base-entity';
import { IWizard } from '../domain/interfaces/wizard.interface';

@Entity({ name: 'wizards' })
export class WizardEntity extends BaseEntity implements IWizard {
  @Column({ name: 'questionnaire_id', type: 'uuid' })
  public questionnaireId: string;

  @Column({ type: 'boolean' })
  public completed: boolean;
}
