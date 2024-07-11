export interface ApiErrorType extends Error {
  statusCode: number;
  name: string;
}

export class ApiError extends Error implements ApiErrorType {
  public statusCode: number;
  public name: string;
  public error: string;
  public messages: string[];

  public constructor(error = 'OK', statusCode = 200, messages?: string[]) {
    super();
    this.name = 'ApiError';
    this.error = error;
    this.messages = messages || [];
    this.statusCode = statusCode;
  }
}
