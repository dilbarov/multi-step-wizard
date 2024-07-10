import { QUESTIONNAIRE_CONFIG } from '@entities/questionnaire/questionnaire.config';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Entity({
  database: QUESTIONNAIRE_CONFIG.title,
  schema: QUESTIONNAIRE_CONFIG.title,
})
export class QuestionnaireEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @OneToMany(() => QuestionEntity, question => question.questionnaire)
  public questions: QuestionEntity[];
}
