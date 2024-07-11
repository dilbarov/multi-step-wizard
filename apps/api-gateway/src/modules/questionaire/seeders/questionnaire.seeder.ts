import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { v4 } from 'uuid';

import { QuestionType } from '../domain/interfaces';
import { QuestionEntity, QuestionnaireEntity } from '../entities';

export default class QuestionnaireSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await dataSource.query('TRUNCATE "questions" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "questionnaires" RESTART IDENTITY CASCADE;');

    const questionnaireRepository = dataSource.getRepository(QuestionnaireEntity);
    const questionRepository = dataSource.getRepository(QuestionEntity);

    const questionnaire1 = new QuestionnaireEntity();
    questionnaire1.id = 'f8c49dba-695c-474a-b2b7-bf630c9e65e1';
    questionnaire1.title = 'Test Questionnaire 1';

    await questionnaireRepository.save([questionnaire1]);

    const questions1: QuestionEntity[] = [
      {
        id: v4(),
        orderId: 0,
        stepId: 1,
        text: 'What is your name?',
        type: QuestionType.INPUT,
        options: [],
        deleted: false,
        questionnaire: questionnaire1,
      },
      {
        id: v4(),
        orderId: 1,
        stepId: 1,
        text: 'What is your age?',
        type: QuestionType.NUMERIC,
        options: [],
        deleted: false,
        questionnaire: questionnaire1,
      },
      {
        id: v4(),
        orderId: 0,
        stepId: 2,
        text: 'What is your gender?',
        type: QuestionType.SINGLE_CHOICE,
        options: ['Male', 'Female', 'Other'],
        deleted: false,
        questionnaire: questionnaire1,
      },
      {
        id: v4(),
        orderId: 1,
        stepId: 2,
        text: 'What are your hobbies?',
        type: QuestionType.MULTI_CHOICE,
        options: ['Reading', 'Traveling', 'Gaming', 'Programming', 'Interviewing'],
        deleted: false,
        questionnaire: questionnaire1,
      },
    ];

    await questionRepository.save(questions1);
  }
}
