import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../shared/base/base-entity/base-entity';
import { QuestionEntity } from './question.entity';

@Entity({
  name: 'questionnaires',
})
export class QuestionnaireEntity extends BaseEntity {
  @Column({ type: 'character varying' })
  public title: string;

  @OneToMany(() => QuestionEntity, question => question.questionnaire)
  public questions: QuestionEntity[];
}
