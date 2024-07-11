import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base-entity/base-entity';
import { IAnswer, IAnswerValue } from '../domain/interfaces/answer.interface';

@Entity({ name: 'answers' })
export class AnswerEntity extends BaseEntity implements IAnswer {
  @Column({ name: 'wizard_id', type: 'uuid' })
  public wizardId: string;

  @Column({ name: 'question_id', type: 'uuid' })
  public questionId: string;

  @Column({ type: 'jsonb' })
  public answer: IAnswerValue;
}
