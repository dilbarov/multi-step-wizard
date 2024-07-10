import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { QUESTIONNAIRE_CONFIG } from './questionnaire.config';
import { QuestionnaireEntity } from './questionnaire.entity';

@Entity({
  database: QUESTIONNAIRE_CONFIG.title,
  schema: QUESTIONNAIRE_CONFIG.title,
})
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'integer' })
  public stepId: string;

  @Column({ type: 'character varying' })
  public text: string;

  @Column({ type: 'jsonb' })
  public options: string[];

  @Column({ type: 'boolean' })
  public deleted: boolean;

  @ManyToOne(() => QuestionnaireEntity, questionnaire => questionnaire.questions)
  public questionnaire: QuestionnaireEntity;
}
