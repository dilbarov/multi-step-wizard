import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAsyncEffect } from '../../../../shared/hooks/use-async-effect.ts';
import { IAnswerCreateSchema, IAnswerValue, IStepConfig } from '../domain/types/wizard.types.ts';
import { useWizardApi } from './use-wizard-api.ts';

export const useWizard = (questionnaireId: string) => {
  const { startWizard, getStepConfig, submitStep } = useWizardApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const [wizardId, setWizardId] = React.useState<string | null>(
    searchParams.has('session') ? searchParams.get('session') : null,
  );
  const [currentStep, setCurrentStep] = React.useState<IStepConfig | null>(null);
  const [completed, setCompleted] = React.useState<boolean>(false);
  const [answers, setAnswers] = React.useState<Map<string, IAnswerValue>>(new Map());
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  const [started, setStarted] = React.useState<boolean>(searchParams.has('session'));
  const [loading, setLoading] = React.useState<boolean>(false);

  const setState = React.useCallback((stepConfig: IStepConfig) => {
    setWizardId(stepConfig.wizardId);
    setCurrentStep(stepConfig);
    setCompleted(stepConfig.progress.total === stepConfig.progress.completed);
    setCanSubmit(false);
    searchParams.set('step', String(stepConfig.stepId));
    searchParams.set('session', stepConfig.wizardId);
    setSearchParams(searchParams);
  }, []);

  const start = React.useCallback(async () => {
    setLoading(true);
    const newWizard = await startWizard(questionnaireId);
    setStarted(true);
    setState(newWizard);
    setLoading(false);
  }, [questionnaireId, startWizard]);

  const submit = React.useCallback(async () => {
    if (currentStep === null || !canSubmit || currentStep.stepId === null) {
      return;
    }
    setLoading(true);
    const nextStep = await submitStep(
      currentStep.wizardId,
      currentStep.stepId,
      currentStep.questions.reduce<IAnswerCreateSchema[]>((acc, question) => {
        const answer = answers.get(question.id);
        if (answer !== undefined) {
          acc.push({ questionId: question.id, answer });
        }
        return acc;
      }, []),
    );

    setState(nextStep);
    setLoading(false);
  }, [currentStep, answers, canSubmit, submitStep]);

  const setAnswer = React.useCallback(
    (questionId: string, answer: IAnswerValue) => {
      setAnswers(prevAnswers => {
        const newAnswers = new Map(prevAnswers);
        newAnswers.set(questionId, answer);
        let _canSubmit = true;
        const questions = currentStep?.questions || [];
        for (const question of questions) {
          if (
            !newAnswers.has(question.id) ||
            newAnswers.get(question.id)?.value === undefined ||
            newAnswers.get(question.id)?.value === ''
          ) {
            _canSubmit = false;
            break;
          }
        }
        setCanSubmit(_canSubmit);
        return newAnswers;
      });
    },
    [currentStep],
  );

  const done = React.useCallback(() => {
    setStarted(false);
    setCompleted(false);
    setWizardId(null);
    setCurrentStep(null);
    searchParams.delete('session');
    searchParams.delete('step');
    setSearchParams(searchParams);
  }, []);

  useAsyncEffect(
    async abortSignal => {
      if (wizardId && currentStep === null) {
        setLoading(true);
        const firstStep = await getStepConfig(wizardId, 1, abortSignal);
        const result = await getStepConfig(wizardId, firstStep.progress.completed + 1, abortSignal);
        setState(result);
        setLoading(false);
      }
    },
    [wizardId, currentStep],
  );

  return { currentStep, answers, started, loading, canSubmit, completed, start, submit, done, setAnswer };
};
