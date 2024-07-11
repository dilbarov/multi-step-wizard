import React from 'react';
import { QuestionType } from '../../domains/types/question.types.ts';
import { NumericVariant } from '../variants/numeric-variant.tsx';
import { InputVariant } from '../variants/input-variant.tsx';
import { MultiChoiceVariant } from '../variants/multi-choice-variant.tsx';
import { SingleChoiceVariant } from '../variants/single-choice-variant.tsx';
import { AnswerType } from '../../../wizard/domain/types/wizard.types.ts';

interface Props {
  title: string;
  options?: string[];
  value?: AnswerType;
  type: QuestionType;
  onChange?: (value: AnswerType) => void;
}

export const QuestionItem: React.FC<Props> = ({ type, title, value, options = [], onChange }) => {
  const renderAnswerField = () => {
    switch (type) {
      case QuestionType.NUMERIC:
        return <NumericVariant value={value as number} onChange={onChange} />;
      case QuestionType.INPUT:
        return <InputVariant value={value as string} onChange={onChange} />;
      case QuestionType.MULTI_CHOICE:
        return <MultiChoiceVariant values={value as string[]} options={options} onChange={onChange} />;
      case QuestionType.SINGLE_CHOICE:
        return <SingleChoiceVariant value={value as string} options={options} onChange={onChange} />;
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>{renderAnswerField()}</div>
    </div>
  );
};
