import { PickType } from '@nestjs/swagger';

import { filterFields } from '../../../../shared/utils/filter-fields';
import { QuestionModel } from '../models';

const keys: Array<keyof QuestionModel> = ['id', 'orderId', 'text', 'type', 'options'];

export class PublicQuestionGetDto extends PickType(QuestionModel, keys) {
  public constructor(partial: Partial<QuestionModel>) {
    super();
    Object.assign(this, filterFields<PublicQuestionGetDto>(partial, keys));
  }
}
