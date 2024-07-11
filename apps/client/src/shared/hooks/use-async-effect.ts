import React from 'react';

import { runAsyncAction } from '../helpers/run-async-action.ts';
import { useAsyncError } from './use-async-error.ts';

export const useAsyncEffect = (
  action: (abortSignal: AbortSignal) => Promise<void>,
  deps: React.DependencyList = [],
): void => {
  React.useEffect(() => {
    const abortController = new AbortController();
    runAsyncAction(() => action(abortController.signal));
    return () => {
      abortController.abort();
    };
  }, deps);
};

export const useAsyncEffectWithError = (
  action: (abortSignal: AbortSignal) => Promise<void>,
  deps: React.DependencyList = [],
): void => {
  const throwError = useAsyncError();
  const actionWrapper = async (abortSignal: AbortSignal): Promise<void> => {
    try {
      await action(abortSignal);
    } catch (e) {
      const error = e as Error;
      if (error.name !== `AbortError`) {
        throwError(error);
      }
    }
  };
  useAsyncEffect(actionWrapper, deps);
};
