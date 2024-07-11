import React from 'react';

import { useAsyncEffectWithError } from '../../../../shared/hooks/use-async-effect.ts';
import { IQuestionnaire } from '../domains/types/questionnaire.types.ts';
import { useQuestionnaireApi } from './use-questionnaire-api.ts';

export const useQuestionnaireList = () => {
  const { getQuestionnaires } = useQuestionnaireApi();
  const [questionnaires, setQuestionnaires] = React.useState<IQuestionnaire[]>([]);

  useAsyncEffectWithError(async abortSignal => {
    const result = await getQuestionnaires(abortSignal);
    setQuestionnaires(result);
  }, []);

  return questionnaires;
};
