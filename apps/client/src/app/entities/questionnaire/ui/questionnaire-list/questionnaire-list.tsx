import React from 'react';
import { IQuestionnaire } from '../../domains/types/questionnaire.types.ts';
import { QuestionnaireItem } from '../questionnaire-item/questionnaire-item.tsx';

interface Props {
  items: IQuestionnaire[];
}

export const QuestionnaireList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <h2>Questionnaire List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <QuestionnaireItem title={item.title} link={`/questionnaire/${item.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};
