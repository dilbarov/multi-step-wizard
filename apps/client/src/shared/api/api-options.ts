export class ApiOptions implements RequestInit {
  public method: string;
  public credentials: RequestCredentials = 'include';
  public signal: AbortSignal | undefined = undefined;
  public headers: HeadersInit = {
    Pragma: 'no-cache',
    'Content-Type': 'application/json; charset=utf-8',
  };
  public body: BodyInit | undefined = undefined;

  public constructor(method: string, signal?: AbortSignal) {
    this.method = method;
    this.signal = signal;
  }

  public addHeaders(headers: HeadersInit): ApiOptions {
    this.headers = {
      ...this.headers,
      ...headers,
    };
    return this;
  }

  public clearHeaders(): ApiOptions {
    this.headers = {};
    return this;
  }

  public setBody(body: unknown): ApiOptions {
    this.body = JSON.stringify(body);
    return this;
  }

  public setFile(file: File): ApiOptions {
    this.body = file;
    return this;
  }
}
