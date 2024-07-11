import { PickType } from '@nestjs/swagger';

import { filterFields } from '../../../../shared/utils/filter-fields';
import { QuestionnaireModel } from '../models';

const keys: Array<keyof QuestionnaireModel> = ['id', 'title'];

export class PublicQuestionnaireGetDto extends PickType(QuestionnaireModel, []) {
  public constructor(partial: Partial<QuestionnaireModel>) {
    super();
    Object.assign(this, filterFields(partial, keys));
  }
}
