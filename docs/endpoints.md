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

## Inputs/outputs types [backend/src/shared/api/types/NounVerb.ts]
This file defines the shape of the payload we expect to receive (input) at the endpoint and the shape of the payload we expect to return (output).

I.e

export type NounVerbPayload = {
  key: value type;
};
export interface NounVerbOutput extends BaseOutput {}

Example:

export type UsersCreatePayload = {
  username: string;
  password: string;
};
export interface UsersCreateOutput extends BaseOutput {}

## API routing/configuration [backend/src/infra/routes/apiMethods.ts]
This file sets up the configuration of the endpoint that is then used by `routeConfig.ts` to build the endpoint at runtime.

I.e.

nonVerb: {
    httpMethod: 'method name',
    path: 'noun.verb',
    handler: '../../handlers/actions/NounVerbHandler.ts',
    handlerName: 'NounVerbHandler',
},

Example

usersCreate: {
    httpMethod: 'post',
    path: 'users.create',
    handler: '../../handlers/actions/UsersCreateHandler.ts',
    handlerName: 'UsersCreateHandler',
},

## API method map [backend/src/shared/api/ApiMethodMap.ts]
This file defines the object shape/types associated with each API method.

I.e.

import type { NounVerbPayload, NounVerbOutput } from './types/NounVerb';

'noun.verb': {
    request: NounVerbPayload;
    response: NounVerbOutput;
};

Example

import type { UsersCreatePayload, UsersCreateOutput } from './types/UsersCreate';

'users.create': {
    request: UsersCreatePayload;
    response: UsersCreateOutput;
};


## Validation [backend/src/shared/api/types/NounVerb.ts]
We leverage a third-party data validation library 'Joi' to validate the payloads the endpoint receives. Joi works off the payload shape we define above.

I.e.

export const nounVerbSchema = Joi.object<NounVerbPayload>({
    key: Joi.type().required(),
});

Example

export const usersCreateSchema = Joi.object<UsersCreatePayload>({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

## Handler [backend/src/handlers/actions/NounVerbHandler.ts]
Logic to run when the endpoint is requested. This file makes use of the expected inputs/outputs we defined above as well as leveraging the validation schema we defined. When building the endpoint in isolation we just need to return a success response.

E.g
 
class NounVerbHandler extends BaseHandler<NounVerbPayload, NounVerbOutput> {
  constructor() {
    super(nounVerbSchema);
  }
  protected getResult(payload: Result<NounVerbPayload>, res: Response<NounVerbOutput>) {
    return res.send({ ok: true });
  }
}

Example

class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  constructor() {
    super(usersCreateSchema);
  }
  protected getResult(payload: Result<UsersCreatePayload>, res: Response<UsersCreateOutput>) {
    return res.send({ ok: true });
  }
}

## Hanlder unit test [backend/src/handlers/actions/NounVerbHandler.test.ts]
Unit tests for the handler function


## Request testing [backend/test-requests/nounVerb.http]
We leverage an http library in the text editor in order to send manual tests to the endpoint

I.e

POST http://localhost:3000/api/actions/noun.verb
content-type: application/json

{
    "key": "value",
}

Example

POST http://localhost:3000/api/actions/users.create
content-type: application/json

{
    "username": "test",
    "password": "abc123"
}