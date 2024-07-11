import React from 'react';

import { WizardApi } from '../api/wizard.api.ts';
import { IAnswerCreateSchema, IStepConfig } from '../domain/types/wizard.types.ts';

export const useWizardApi = () => {
  const api = React.useMemo(() => new WizardApi(), []);

  const startWizard = React.useCallback(
    async (questionnaireId: string, signal?: AbortSignal): Promise<IStepConfig> => {
      return await api.startWizard(questionnaireId, signal);
    },
    [api],
  );

  const getStepConfig = React.useCallback(
    async (wizardId: string, stepId: number, signal?: AbortSignal): Promise<IStepConfig> => {
      return await api.getStepConfig(wizardId, stepId, signal);
    },
    [api],
  );

  const submitStep = React.useCallback(
    async (
      wizardId: string,
      stepId: number,
      answers: IAnswerCreateSchema[],
      signal?: AbortSignal,
    ): Promise<IStepConfig> => {
      return await api.submitStep(wizardId, stepId, answers, signal);
    },
    [api],
  );

  return { startWizard, getStepConfig, submitStep };
};
