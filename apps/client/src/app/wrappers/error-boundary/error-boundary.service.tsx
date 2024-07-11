import React from 'react';
import { ApiError } from '../../../shared/api/api-error.ts';

export class ErrorBoundaryService {
  public reload(): void {
    window.location.reload();
  }

  public render400() {
    console.log('Bad request');
  }

  public render500() {
    console.log('Server error');
  }

  public render404(): React.ReactNode {
    return <div>Not found</div>;
  }

  public renderError(error?: ApiError | Error) {
    const _error = error as ApiError;
    const errorCode = _error?.statusCode;
    switch (errorCode) {
      case 400:
        return this.render400();
      case 404:
        return this.render404();
      case 500:
        return this.render500();
      default:
        return this.render400();
    }
  }
}
