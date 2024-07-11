import { PickType } from '@nestjs/swagger';

import { filterFields } from '../../../../shared/utils/filter-fields';
import { AnswerModel } from '../models/answer.model';

const keys: Array<keyof AnswerModel> = ['wizardId', 'questionId', 'answer'];

export class PublicAnswerGetDto extends PickType(AnswerModel, keys) {
  public constructor(partial: Partial<AnswerModel>) {
    super();
    Object.assign(this, filterFields(partial, keys));
  }
}
