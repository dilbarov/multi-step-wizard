import { useRouteError } from 'react-router';
import React from 'react';
import { ApiError } from '../../../shared/api/api-error.ts';
import { ErrorBoundaryService } from './error-boundary.service.tsx';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as ApiError;
  const service = React.useMemo(() => new ErrorBoundaryService(), []);
  return <>{service.renderError(error)}</>;
};
