import * as path from 'node:path';
import * as process from 'node:process';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SeederOptions } from 'typeorm-extension';

import { AnswerEntity } from '../../modules/answer/entities/answer.entity';
import { QuestionEntity, QuestionnaireEntity } from '../../modules/questionaire/entities';
import QuestionnaireSeeder from '../../modules/questionaire/seeders/questionnaire.seeder';
import { WizardEntity } from '../../modules/wizard/entities/wizard.entity';

config({ path: path.join(process.cwd(), '.env') });
const configService = new ConfigService();

export const getOptions = (): PostgresConnectionOptions & SeederOptions => {
  return {
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    type: 'postgres',
    synchronize: false,
    entities: [QuestionnaireEntity, QuestionEntity, WizardEntity, AnswerEntity],
    migrations: [path.join(__dirname, '..', '..', '..', 'migrations', '**', '*{.ts,.js}')],
    migrationsRun: true,
    seeds: [QuestionnaireSeeder],
  };
};

export const appDataSource = new DataSource(getOptions());
