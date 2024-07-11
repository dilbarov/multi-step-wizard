import * as React from 'react';

export const useAsyncError = (): ((e: Error) => void) => {
  const [, setError] = React.useState();
  return React.useCallback(
    (e: Error) => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
};
