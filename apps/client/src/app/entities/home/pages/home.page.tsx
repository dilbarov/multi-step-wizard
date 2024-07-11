import React from 'react';
import { QuestionnaireList } from '../../questionnaire/ui/questionnaire-list/questionnaire-list.tsx';
import { useQuestionnaireList } from '../../questionnaire/hooks/use-questionnaire-list.ts';

export const HomePage: React.FC = () => {
  const questionnaires = useQuestionnaireList();
  return (
    <div>
      <h1>Welcome to the Multi-Step Wizard!</h1>
      <QuestionnaireList items={questionnaires} />
    </div>
  );
};
