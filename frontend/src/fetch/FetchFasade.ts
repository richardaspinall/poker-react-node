import Result, { ResultSuccess, ResultError } from '../../../backend/src/Result';

class FetchFasade {
  static async post(route: string, payload: any): Promise<Result<any>> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    // We also need to set the `Accept` header to `application/json`
    // to tell the server that we expect JSON in response
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('http://127.0.0.1:3000' + route, {
      // We need to set the `method` to `POST` and assign the headers
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const response = await fetch(request);
    if (!response.ok) {
      console.log(response);
      console.log(response.statusText);
      return new ResultError(response.statusText);
    }
    const resJson = await response.json();

    return new ResultSuccess(resJson);
  }
}

export default FetchFasade;
