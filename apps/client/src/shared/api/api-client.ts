import { ApiError } from './api-error.ts';
import { ApiOptions } from './api-options.ts';

export interface QueryClient extends ObjectQuery {
  search?: string;
  take?: number;
  skip?: number;
}

type ObjectQuery = Record<string, unknown>;

export class ApiClient {
  private readonly _baseUrl: string;
  private readonly _prefix = '/api';

  public constructor(baseUrl: string = '') {
    this._baseUrl = baseUrl;
  }

  public static stringify(objectQuery: ObjectQuery): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new URLSearchParams(objectQuery).toString();
  }

  private async fetch(input: RequestInfo | URL, init?: ApiOptions): Promise<Response> {
    const _init = init || new ApiOptions('GET');
    return await fetch(input, _init);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private static async responseParseOrFail<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      const result = await response.text();
      let parsedResult;
      try {
        parsedResult = JSON.parse(result);
      } catch (e) {
        parsedResult = result;
      }
      const messages = Array.isArray(parsedResult?.message) ? parsedResult.message : [parsedResult?.message || result];
      throw new ApiError(response.statusText, response.status, messages);
    }
    const responseText = await response.text();
    if (responseText) {
      return JSON.parse(responseText) as TResult;
    }
  }

  private async fetchOrFail<TResult>(input: RequestInfo | URL, init?: ApiOptions): Promise<TResult> {
    const response = await this.fetch(input, init);
    return await ApiClient.responseParseOrFail(response);
  }

  public async get<TResult, TQuery extends ObjectQuery = QueryClient>(
    url: string,
    qs: TQuery = {} as TQuery,
    signal?: AbortSignal,
  ): Promise<TResult> {
    const input = `${this._baseUrl}${this._prefix}${url}?${ApiClient.stringify(qs)}`;
    return await this.fetchOrFail<TResult>(input, new ApiOptions('GET', signal));
  }

  public async getWithBaseUrl<TResult, TQuery extends ObjectQuery = QueryClient>(
    baseUrl: string,
    url: string,
    qs: TQuery = {} as TQuery,
    signal?: AbortSignal,
  ): Promise<TResult> {
    const input = `${baseUrl}${url}?${ApiClient.stringify(qs)}`;
    return await this.fetchOrFail<TResult>(input, new ApiOptions('GET', signal));
  }

  public async patch<TResult>(url: string, body?: unknown, signal?: AbortSignal): Promise<TResult> {
    return await this.fetchOrFail<TResult>(
      `${this._baseUrl}${this._prefix}${url}`,
      new ApiOptions('PATCH', signal).setBody(body),
    );
  }

  public async put<TResult>(url: string, body?: unknown, signal?: AbortSignal): Promise<TResult> {
    return await this.fetchOrFail<TResult>(
      `${this._baseUrl}${this._prefix}${url}`,
      new ApiOptions('PUT', signal).setBody(body),
    );
  }

  public async post<TResult>(url: string, body?: unknown, signal?: AbortSignal): Promise<TResult> {
    return await this.fetchOrFail<TResult>(
      `${this._baseUrl}${this._prefix}${url}`,
      new ApiOptions('POST', signal).setBody(body),
    );
  }

  public async delete(url: string, body?: unknown, signal?: AbortSignal): Promise<void> {
    await this.fetch(`${this._baseUrl}${this._prefix}${url}`, new ApiOptions('DELETE', signal).setBody(body));
  }
}
