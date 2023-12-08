import Result, { ResultSuccess, ResultError } from '../../../backend/src/shared/Result';

class FetchFasade {
  private static async processRequest<TResult>(request: RequestInfo): Promise<Result<TResult>> {
    const response = await fetch(request);
    const body = await response.json();

    if (!response.ok) {
      return new ResultError(body.error);
    }

    return new ResultSuccess(body);
  }

  static async post<TPayload, TResult = null>(route: string, payload: TPayload): Promise<Result<TResult>> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('http://127.0.0.1:3000' + route, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    return FetchFasade.processRequest<TResult>(request);
  }

  static async get<TResult>(route: string): Promise<Result<TResult>> {
    const headers: Headers = new Headers();
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('http://127.0.0.1:3000' + route, {
      method: 'GET',
      headers: headers,
    });

    return FetchFasade.processRequest<TResult>(request);
  }
}

export default FetchFasade;
