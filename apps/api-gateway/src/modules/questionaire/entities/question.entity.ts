import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base-entity/base-entity';
import { IQuestion, QuestionType } from '../domain/interfaces';
import { QuestionnaireEntity } from './questionnaire.entity';

@Entity({
  name: 'questions',
})
export class QuestionEntity extends BaseEntity implements IQuestion {
  @Column({ type: 'integer' })
  public orderId: number;

  @Column({ type: 'integer' })
  public stepId: number;

  @Column({ type: 'character varying' })
  public text: string;

  @Column({ type: 'character varying' })
  public type: QuestionType;

  @Column({ type: 'jsonb', default: '[]' })
  public options: string[];

  @Column({ type: 'boolean', default: false })
  public deleted: boolean;

  @ManyToOne(() => QuestionnaireEntity, questionnaire => questionnaire.questions)
  public questionnaire: QuestionnaireEntity;
}
