import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswerModule } from '../answer/answer.module';
import { QuestionnaireModule } from '../questionaire/questionnaire.module';
import { WizardController } from './controllers/wizard.controller';
import { WizardEntity } from './entities/wizard.entity';
import { WizardService } from './services/wizard.service';

@Module({
  imports: [TypeOrmModule.forFeature([WizardEntity]), AnswerModule, QuestionnaireModule],
  controllers: [WizardController],
  providers: [WizardService],
  exports: [WizardService],
})
export class WizardModule {}
