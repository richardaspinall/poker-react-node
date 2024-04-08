## Creating an endpoint

This document walks through the various parts required to implement an endpoint.

## Naming convention

For consistency we name endpoints with a NounVerb structure.

E.g.
users.create
UsersCreateHandler
UsersCreatePayload
UsersCreateOutput
etc...

## Inputs/outputs types

Location:
`backend/src/shared/api/{domain}/types/NounVerb.ts`

This file defines the shape of the payload we expect to receive (input) at the endpoint and the shape of the payload we expect to return (output).

I.e

```ts
export type NounVerbPayload = {
key: value type;
};

export interface NounVerbOutput extends BaseOutput {}
```

Example:

```ts
export type UsersCreatePayload = {
  username: string;
  password: string;
};

export interface UsersCreateOutput extends BaseOutput {}
```

## API routing/configuration

Location: `backend/src/shared/api/ApiMethods.ts`

This file sets up the configuration of the endpoint that is then used by `routeConfig.ts` to build the endpoint at runtime.

I.e.

```ts
nounVerb: {
  httpMethod: 'method name',
  path: 'noun.verb',
  handler: '../../handlers/{domain}/NounVerbHandler.ts',
  handlerName: 'NounVerbHandler',
},
```

Example

```ts
usersCreate: {
  httpMethod: 'post',
  path: 'users.create',
  handler: '../../handlers/users/UsersCreateHandler.ts',
  handlerName: 'UsersCreateHandler',
},
```

## API method map

Location: `backend/src/shared/api/ApiMethodMap.ts`

This file defines the object shape/types associated with each API method.

I.e.

```ts
import type { NounVerbPayload, NounVerbOutput } from './types/NounVerb';

'noun.verb': {
  request: NounVerbPayload;
  response: NounVerbOutput;
};
```

Example

```ts
import type { UsersCreatePayload, UsersCreateOutput } from './types/UsersCreate';

'users.create': {
  request: UsersCreatePayload;
  response: UsersCreateOutput;
};
```

## Validation

Location: `backend/src/shared/api/{domain}/types/NounVerb.ts`

We leverage a third-party data validation library 'Joi' to validate the payloads the endpoint receives. Joi works off the payload shape we define above.

Docs: https://joi.dev/api/?v=17.12.2

I.e.

```ts
export const nounVerbSchema =
  Joi.object <
  NounVerbPayload >
  {
    key: Joi.type().required(),
  };
```

Example

```ts
export const usersCreateSchema =
  Joi.object <
  UsersCreatePayload >
  {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };
```

## Handler

Location: `backend/src/handlers/{domain}/NounVerbHandler.ts`

Logic to run when the endpoint is requested. This file makes use of the expected inputs/outputs we defined above as well as leveraging the validation schema we defined. When building the endpoint in isolation we just need to return a success response.

I.e

```ts
class NounVerbHandler extends BaseHandler<NounVerbPayload, NounVerbOutput> {
  constructor() {
    super(nounVerbSchema);
  }

  protected getResult(payload: NounVerbPayload, res: Response<NounVerbOutput>) {
    return res.send({ ok: true });
  }
}
```

Example

```ts
class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  constructor() {
    super(usersCreateSchema);
  }

  protected getResult(payload: UsersCreatePayload, res: Response<UsersCreateOutput>) {
    return res.send({ ok: true });
  }
}
```

## Error handler

Errors for the client are created from the BaseError, any error you add to the error code enum will surface to the client otherwise they will be an internal error:

1. Create the error in the `errors` directory with the API handler: `handlers/users/errors`:

```js
import { BaseError } from '@infra/BaseError';

export class UsernameTakenError extends BaseError {
  constructor() {
    super('name_taken', 'username already taken');
  }
}
```

2. Add to the error codes enum in the `@shared/api/{api_endpoint}/types` file:

```js
export enum UsersCreateErrorCodes {
  ...
  UsernameTaken = 'username_taken',
}
```

3. Ensure the enum is passed to the parent in the constructor

```js
constructor() {
  super(usersCreateSchema, UsersCreateErrorCodes);
}
```

## Handler unit test

Location: `backend/src/handlers/actions/NounVerbHandler.test.ts`

Unit tests for the handler function

## Request testing

Location `backend/test-requests/nounVerb.http`

We leverage an http library in the text editor in order to send manual tests to the endpoint

I.e

```json
POST http://localhost:3000/api/actions/noun.verb
content-type: application/json

{
  "key": "value",
}
```

Example

```json
POST http://localhost:3000/api/actions/users.create
content-type: application/json

{
  "username": "test",
  "password": "abc123"
}
```
