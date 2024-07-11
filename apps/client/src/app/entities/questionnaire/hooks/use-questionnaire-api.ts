import React from 'react';

import { QuestionnaireApi } from '../api/questionnaire.api.ts';
import { IQuestionnaire, IStep } from '../domains/types/questionnaire.types.ts';

export const useQuestionnaireApi = () => {
  const api = React.useMemo(() => new QuestionnaireApi(), []);

  const getQuestionnaires = React.useCallback(
    async (signal?: AbortSignal): Promise<IQuestionnaire[]> => {
      return await api.getQuestionnaires(signal);
    },
    [api],
  );

  const getQuestionnaire = React.useCallback(
    async (questionnaireId: string, signal?: AbortSignal): Promise<IQuestionnaire> => {
      return await api.getQuestionnaire(questionnaireId, signal);
    },
    [api],
  );

  const getSteps = React.useCallback(
    async (questionnaireId: string, signal?: AbortSignal): Promise<IStep[]> => {
      return await api.getSteps(questionnaireId, signal);
    },
    [api],
  );

  return { getQuestionnaires, getQuestionnaire, getSteps };
};
