import { Result } from './Result';

class FetchFacade {
  private static async processRequest<TResult>(request: RequestInfo): Promise<Result<TResult>> {
    const response = await fetch(request);

    if (!response.ok) {
      return Result.fail(response.statusText);
    }

    const body: TResult = await response.json();

    return Result.ok(body);
  }

  static async post<TPayload, TResult = null>(route: string, payload: TPayload): Promise<Result<TResult>> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('http://localhost:3000/api/' + route, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    return FetchFacade.processRequest<TResult>(request);
  }

  static async get<TResult>(route: string): Promise<Result<TResult>> {
    const headers: Headers = new Headers();
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('http://localhost:3000/api/' + route, {
      method: 'GET',
      headers: headers,
    });

    return FetchFacade.processRequest<TResult>(request);
  }
}

export default FetchFacade;
