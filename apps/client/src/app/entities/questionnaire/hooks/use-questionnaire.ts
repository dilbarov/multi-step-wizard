import React from 'react';
import { useParams } from 'react-router';

import { useAsyncEffect } from '../../../../shared/hooks/use-async-effect.ts';
import { IQuestion } from '../../question/domains/types/question.types.ts';
import { useQuestionnaireApi } from './use-questionnaire-api.ts';

export const useQuestionnaire = () => {
  const { getQuestionnaire, getSteps } = useQuestionnaireApi();

  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [title, setTitle] = React.useState('');

  const { id } = useParams();

  useAsyncEffect(
    async abortSignal => {
      if (id) {
        const result = await getQuestionnaire(id, abortSignal);
        setTitle(result.title);

        const steps = await getSteps(id, abortSignal);
        setQuestions(
          steps.reduce<IQuestion[]>((acc, step) => {
            acc.push(...step.questions);
            return acc;
          }, []),
        );
      }
    },
    [id],
  );

  return { questions, title, questionnaireId: id as string };
};
