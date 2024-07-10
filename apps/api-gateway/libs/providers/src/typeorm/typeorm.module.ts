import { QuestionEntity, QUESTIONNAIRE_CONFIG, QuestionnaireEntity } from '@entities/questionnaire';
import { getCredentialsOptions } from '@lib/providers/typeorm/typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const commonOptions = getCredentialsOptions(configService);
        const appDataSource = new DataSource({
          ...commonOptions,
          applicationName: QUESTIONNAIRE_CONFIG.title,
          type: 'postgres',
          database: QUESTIONNAIRE_CONFIG.title,
          entities: [QuestionnaireEntity, QuestionEntity],
        });
        return appDataSource.options;
      },
    }),
  ],
})
export class TypeormModule {}
