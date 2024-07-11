import { Module } from '@nestjs/common';

import { AnswerModule } from './answer/answer.module';
import { QuestionnaireModule } from './questionaire/questionnaire.module';
import { WizardModule } from './wizard/wizard.module';

@Module({
  imports: [QuestionnaireModule, WizardModule, AnswerModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DomainsModule {}
