import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { QuestionType } from '../domain/interfaces';
import { QuestionEntity, QuestionnaireEntity } from '../entities';

export default class QuestionnaireSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await dataSource.query('TRUNCATE "questionnaires" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "questions" RESTART IDENTITY CASCADE;');

    const questionnaireRepository = dataSource.getRepository(QuestionnaireEntity);
    const questionRepository = dataSource.getRepository(QuestionEntity);

    const questionnaire1 = new QuestionnaireEntity();
    questionnaire1.id = 'f8c49dba-695c-474a-b2b7-bf630c9e65e1';
    questionnaire1.title = 'Test Questionnaire 1';

    const questionnaire2 = new QuestionnaireEntity();
    questionnaire2.id = '02148589-4039-4899-8236-000457689787';
    questionnaire2.title = 'Test Questionnaire 2';

    await questionnaireRepository.save([questionnaire1]);
    await questionnaireRepository.save([questionnaire2]);

    const questions1: QuestionEntity[] = [
      {
        id: '6ba24e00-9316-4062-bc63-6367e4910c56',
        orderId: 0,
        stepId: 1,
        text: 'What is your name?',
        type: QuestionType.INPUT,
        options: [],
        deleted: false,
        questionnaire: questionnaire1,
      },
      {
        id: '847dfecd-f210-497d-b6fb-ee2895b4db5a',
        orderId: 1,
        stepId: 1,
        text: 'What is your age?',
        type: QuestionType.NUMERIC,
        options: [],
        deleted: false,
        questionnaire: questionnaire1,
      },
      {
        id: '529fddff-e1a0-4d0b-9001-aeeceaa7aa07',
        orderId: 0,
        stepId: 2,
        text: 'What is your gender?',
        type: QuestionType.SINGLE_CHOICE,
        options: ['Male', 'Female', 'Other'],
        deleted: false,
        questionnaire: questionnaire1,
      },
      {
        id: '4282614d-c99d-483c-a91a-c567943323a5',
        orderId: 1,
        stepId: 2,
        text: 'What are your hobbies?',
        type: QuestionType.MULTI_CHOICE,
        options: ['Reading', 'Traveling', 'Gaming', 'Programming', 'Interviewing'],
        deleted: false,
        questionnaire: questionnaire1,
      },
    ];

    const questions2: QuestionEntity[] = [
      {
        id: '142a072b-a944-4998-b5d4-7d8f488977f4',
        orderId: 0,
        stepId: 1,
        text: 'Who is your favorite author?',
        type: QuestionType.INPUT,
        options: [],
        deleted: false,
        questionnaire: questionnaire2,
      },
      {
        id: '92517803-371c-47c5-8a18-4a138f294551',
        orderId: 1,
        stepId: 1,
        text: 'What is your favorite color?',
        type: QuestionType.SINGLE_CHOICE,
        options: ['Red', 'Blue', 'Green', 'Yellow', 'Other'],
        deleted: false,
        questionnaire: questionnaire2,
      },
      {
        id: '02622299-2b29-458d-b52b-a98708069046',
        orderId: 0,
        stepId: 2,
        text: 'What is your favorite type of food?',
        type: QuestionType.MULTI_CHOICE,
        options: ['Pizza', 'Burger', 'Sushi', 'Ramen', 'Ice Cream'],
        deleted: false,
        questionnaire: questionnaire2,
      },
      {
        id: '9a58f647-25c2-4831-a359-3f164d758a03',
        orderId: 1,
        stepId: 2,
        text: 'What is your favorite book genre?',
        type: QuestionType.SINGLE_CHOICE,
        options: ['Fiction', 'Non-Fiction', "Children's", 'Mystery', 'Other'],
        deleted: false,
        questionnaire: questionnaire2,
      },
    ];

    await questionRepository.save(questions1);
    await questionRepository.save(questions2);
  }
}
