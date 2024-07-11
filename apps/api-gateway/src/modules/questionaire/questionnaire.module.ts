import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionnaireController } from './controllers/questionnaire.controller';
import { QuestionEntity, QuestionnaireEntity } from './entities';
import { QuestionnaireService } from './services/questionnaire.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity, QuestionEntity])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
  exports: [QuestionnaireService],
})
export class QuestionnaireModule {}
