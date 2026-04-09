# Backend Tech Spec

## Purpose

This document describes the backend architecture used in `poker-react-node` so it can be reused as a base pattern for another project. It covers the runtime stack, request lifecycle, data model, session/auth design, websocket model, code structure, and practical examples.

The current backend is a TypeScript `Express + Socket.IO + MySQL` service with:

- thin HTTP handlers
- shared generated API contracts
- session-based authentication
- in-memory game/domain state
- typed websocket event definitions

It is a good base for projects that want consistent request/response contracts, realtime updates, and a clear separation between transport, business logic, and persistence.

## Stack

- Runtime: Node.js
- Language: TypeScript
- HTTP server: Express
- Realtime transport: Socket.IO
- Database: MySQL via `mysql2`
- Session management: `express-session`
- Validation: Joi
- Testing: Jest
- Dev runtime: Nodemon

Relevant source files:

- [backend/src/index.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/index.ts)
- [backend/src/handlers/BaseHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/BaseHandler.ts)
- [backend/src/infra/routes/index.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/infra/routes/index.ts)
- [backend/src/shared/api/gen/APIMethods.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/api/gen/APIMethods.ts)
- [backend/src/sockets/SocketServer.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/sockets/SocketServer.ts)

## High-Level Architecture

The backend is split into a few clear layers:

### 1. Transport Layer

This layer accepts HTTP and websocket traffic.

- Express handles HTTP requests under `/api`
- Socket.IO handles realtime client connections
- Shared session middleware is attached to both HTTP and socket flows

### 2. Handler Layer

Handlers are thin orchestration classes.

They are responsible for:

- validating request payloads
- checking authentication when required
- calling domain/service methods
- validating response payloads
- mapping domain errors into API-safe errors

### 3. Domain/Service Layer

This layer contains the core business logic.

Examples in this repo:

- `UserService`
- `GameLobbyService`
- `Dealer`
- `PokerTable`
- `Game`
- `GameState`

### 4. Persistence Layer

Repositories and DB helpers manage MySQL access.

Examples:

- `UserRepository`
- `MySql`

### 5. Shared Contract Layer

Shared API definitions are generated into typed payload/output contracts and Joi schemas. This keeps FE and BE aligned around the same shape definitions.

## Boot Sequence

At startup the backend:

1. creates the Express app
2. configures session middleware
3. enables JSON and URL-encoded request parsing
4. enables CORS
5. mounts the generated API router at `/api`
6. mounts the global error handler
7. creates the HTTP server
8. initializes Socket.IO with the same session middleware
9. starts listening on port `3000`

Main bootstrap file:

- [backend/src/index.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/index.ts)

## API Design

### Route Naming Convention

API methods use a `domain.verb` convention:

- `users.create`
- `users.signin`
- `users.getProfile`
- `poker-tables.join`
- `poker-tables.leave`
- `poker-tables.getSeats`
- `games.bet`
- `games.call`
- `games.check`
- `games.fold`
- `games.getGameState`

All current routes are exposed as `POST`.

Examples:

- `POST /api/users.signin`
- `POST /api/poker-tables.join`
- `POST /api/games.getGameState`

### Metadata-Driven Route Registration

Routes are not manually registered one by one.

Instead:

1. API metadata files define the contract for each endpoint
2. code generation produces:
   - TS payload/output types
   - Joi schemas
   - abstract handler base classes
   - API method map entries
3. the router dynamically imports each concrete handler from the generated method map

Key files:

- [backend/src/shared/api/metadata/users_signin.json](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/api/metadata/users_signin.json)
- [backend/src/infra/routes/routeConfig.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/infra/routes/routeConfig.ts)
- [backend/src/infra/routes/index.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/infra/routes/index.ts)
- [backend/src/scripts/generate-handler/README.md](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/scripts/generate-handler/README.md)

### Request Lifecycle

For a typical request:

1. client sends `POST /api/<domain>.<verb>`
2. Express resolves the route via the generated route map
3. the concrete handler inherits from `BaseHandler`
4. `BaseHandler` validates the request body with Joi
5. if auth is required, `BaseHandler` checks `req.session.authenticated`
6. the concrete handler runs domain logic and returns a `Result`
7. `BaseHandler` validates the outgoing payload against the generated output schema
8. the response is returned to the client

Base handler:

- [backend/src/handlers/BaseHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/BaseHandler.ts)

## Request and Response Contract

All API methods return a standard response envelope.

```ts
type BaseOutput = {
  ok: boolean;
  payload?: unknown;
  error?: {
    code: string;
    message?: string;
    details?: string;
  };
};
```

Source:

- [backend/src/shared/api/BaseOutput.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/api/BaseOutput.ts)

### Success Pattern

Simple command endpoints often return:

```json
{
  "ok": true
}
```

Read-style endpoints return:

```json
{
  "ok": true,
  "payload": {
    "...": "..."
  }
}
```

### Error Pattern

Client-safe domain and validation errors return:

```json
{
  "ok": false,
  "error": {
    "code": "SOME_ERROR_CODE",
    "message": "Human-readable message",
    "details": "Optional extra details"
  }
}
```

Unhandled errors are converted to:

```json
{
  "ok": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An internal error occurred"
  }
}
```

Error mapping files:

- [backend/src/handlers/ErrorHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/ErrorHandler.ts)
- [backend/src/infra/GlobalErrorHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/infra/GlobalErrorHandler.ts)

## Validation Model

Incoming and outgoing payloads are both validated using Joi.

This gives the backend two protections:

- invalid client payloads are rejected early
- handler implementations cannot silently return malformed responses

Validation helper:

- [backend/src/handlers/validatePayload.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/validatePayload.ts)

## Result/Error Handling Pattern

Business logic and repositories return a `Result<T>` rather than throwing for routine failures.

This pattern makes failure states explicit:

- `ResultSuccess<T>`
- `ResultError<T>`

Example usage:

```ts
const userOrError = await UserService.getUserById(userId);

if (userOrError.isError()) {
  return new ResultError(userOrError.getError());
}

return new ResultSuccess({
  ok: true,
  payload: {
    username: userOrError.getValue().getUsername(),
  },
});
```

Source:

- [backend/src/infra/Result.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/infra/Result.ts)

## Session and Authentication Design

Authentication is session-based.

The session middleware stores:

- `authenticated`
- `userId`
- `username`

On sign-in:

1. username/password are validated
2. session fields are populated
3. a `users_sessions` row is written mapping `user_id` to `session_id`

This session mapping is later used for private websocket messages, such as dealing hole cards to a single player.

Relevant files:

- [backend/src/handlers/users/signin/UsersSigninHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/users/signin/UsersSigninHandler.ts)
- [backend/src/users/UserRepository.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/users/UserRepository.ts)
- [backend/src/users/UserService.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/users/UserService.ts)

### Important Current Constraints

- session secret is hardcoded and should move to env config
- password validation is currently plain-text and should be replaced with password hashing
- session storage is backed by a custom session table and a user-to-session mapping table

## Persistence Model

The MySQL schema includes:

- `users`
- `poker_tables`
- `poker_table_users`
- `sessions`
- `users_sessions`

Schema file:

- [backend/src/db/schema.sql](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/db/schema.sql)

Current schema excerpt:

```sql
CREATE TABLE users (
  user_id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE sessions (
  session_id varchar(255) NOT NULL,
  session_data text,
  PRIMARY KEY (session_id)
);

CREATE TABLE users_sessions (
  user_id VARCHAR(20) NOT NULL UNIQUE,
  session_id varchar(255) NOT NULL,
  PRIMARY KEY (user_id, session_id)
);
```

### Repository Model

Repositories call a small DB adapter rather than embedding SQL in handlers.

This repo currently uses a generic `MySql` helper with methods like:

- `select`
- `insert`
- `update`
- `delete`

Relevant files:

- [backend/src/db/my-sql/MySql.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/db/my-sql/MySql.ts)
- [backend/src/users/UserRepository.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/users/UserRepository.ts)

## In-Memory Domain State

The core poker game state is currently held in memory.

`GameLobbyService` owns live `PokerTable` instances. Each `PokerTable` owns:

- table name
- seats
- player-to-seat mapping
- dealer position
- current `Game`

The `Game` owns:

- `Deck`
- `GameState`

This is an important design choice:

- persistent user/session data lives in MySQL
- live gameplay state lives in process memory

This is fine for a single-node MVP or dev environment, but it is not horizontally scalable without introducing shared state storage such as Redis or a DB-backed state/event model.

Relevant files:

- [backend/src/game-lobby-service/GameLobbyService.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/game-lobby-service/GameLobbyService.ts)
- [backend/src/game/PokerTable.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/game/PokerTable.ts)
- [backend/src/game/Game.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/game/Game.ts)
- [backend/src/game/Dealer.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/game/Dealer.ts)

## Realtime/Websocket Model

Socket.IO is initialized on the same HTTP server as Express and reuses the session middleware. That gives the websocket layer access to the same session context as HTTP.

The realtime model has two delivery styles:

- room broadcasts for shared table events
- direct client messages for private player-specific events

### Room Model

Rooms are tracked in a lightweight room registry.

Example use cases:

- send `player_joined` to everyone at a table
- send `update_pot` to everyone at a table
- send `seat_to_act` to everyone at a table

### Direct Client Model

Sockets are mapped by session ID so the backend can send private events to the correct connected client.

This is used for things like:

- dealing hole cards to a single authenticated player

Relevant files:

- [backend/src/sockets/SocketServer.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/sockets/SocketServer.ts)
- [backend/src/sockets/Sockets.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/sockets/Sockets.ts)
- [backend/src/sockets/Rooms.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/sockets/Rooms.ts)
- [backend/src/game-emitter/GameEmitter.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/game-emitter/GameEmitter.ts)

## Event Contracts

Websocket events are strongly typed in shared files.

### Poker Table Events

- `player_joined`
- `player_left`

### Game Events

- `start_game`
- `deal_cards`
- `fold_cards`
- `seat_to_act`
- `deal_community_cards`
- `update_pot`
- `player_bet`
- `reset_bets`

Contract files:

- [backend/src/shared/websockets/WebsocketEvents.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/websockets/WebsocketEvents.ts)
- [backend/src/shared/websockets/game/types/GameEvents.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/websockets/game/types/GameEvents.ts)
- [backend/src/shared/websockets/poker-tables/types/PokerTableEvents.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/websockets/poker-tables/types/PokerTableEvents.ts)

Example event payloads:

```ts
type PlayerJoinedEvent = {
  username: string;
  seatNumber: number;
};

type DealCardsEvent = {
  cards: Card[];
};

type SeatToActEvent = {
  seatToAct: number;
};
```

## Concrete API Examples

### Example 1: Sign In

Request:

```http
POST /api/users.signin
Content-Type: application/json

{
  "username": "richard",
  "password": "testpassword"
}
```

Success response:

```json
{
  "ok": true
}
```

Validation failure example:

```json
{
  "ok": false,
  "error": {
    "code": "INVALID_REQUEST_PAYLOAD",
    "message": "Invalid request payload",
    "details": "\"username\" is not allowed to be empty"
  }
}
```

Reference request file:

- [backend/test-requests/signin.http](/Users/richardaspinall/Developer/projects/poker-react-node/backend/test-requests/signin.http)

### Example 2: Join Poker Table

Request:

```http
POST /api/poker-tables.join
Content-Type: application/json
Cookie: connect.sid=<session-cookie>

{
  "selectedSeatNumber": 1
}
```

Success response:

```json
{
  "ok": true
}
```

Possible domain errors:

- `SEAT_TAKEN`
- `PLAYER_ALREADY_SEATED`
- `PLAYER_NOT_FOUND_AT_TABLE`
- `POKER_TABLE_DOES_NOT_EXIST`
- `NOT_AUTHED`

Reference files:

- [backend/test-requests/pokerTablesJoin.http](/Users/richardaspinall/Developer/projects/poker-react-node/backend/test-requests/pokerTablesJoin.http)
- [backend/src/handlers/poker-tables/join/PokerTablesJoinHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/poker-tables/join/PokerTablesJoinHandler.ts)

### Example 3: Get Game State

Request:

```http
POST /api/games.getGameState
Content-Type: application/json
Cookie: connect.sid=<session-cookie>

{
  "pokerTableName": "table_1"
}
```

Success response shape:

```json
{
  "ok": true,
  "payload": {
    "bigBlind": 100,
    "smallBlind": 50,
    "dealerPosition": 2,
    "seatToAct": 4,
    "currentBet": 100,
    "pot": 150,
    "roundState": "preFlop",
    "communityCards": [],
    "playersHoleCards": [
      { "cardShortCode": "AS", "rank": "A", "suit": "spades" },
      { "cardShortCode": "KH", "rank": "K", "suit": "hearts" }
    ],
    "playersCurrentBets": [
      { "seatNumber": 1, "currentBet": 50, "chipCount": 950 },
      { "seatNumber": 2, "currentBet": 100, "chipCount": 900 }
    ]
  }
}
```

Possible domain errors:

- `POKER_TABLE_DOES_NOT_EXIST`
- `GAME_STATE_DOES_NOT_EXIST`
- `NOT_AUTHED`

Reference files:

- [backend/test-requests/gamesGetGameState.http](/Users/richardaspinall/Developer/projects/poker-react-node/backend/test-requests/gamesGetGameState.http)
- [backend/src/handlers/games/getGameState/GamesGetGameStateHandler.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/handlers/games/getGameState/GamesGetGameStateHandler.ts)
- [backend/src/shared/api/gen/games/types/GamesGetGameState.ts](/Users/richardaspinall/Developer/projects/poker-react-node/backend/src/shared/api/gen/games/types/GamesGetGameState.ts)

## Example Handler Pattern for Reuse

This is the core pattern worth copying into another project:

```ts
export class ExampleHandler extends AbstractExampleHandler {
  protected async getResult(payload: ExamplePayload, userId?: number) {
    const result = await ExampleService.run(payload, userId);

    if (result.isError()) {
      return new ResultError(result.getError());
    }

    return new ResultSuccess<ExampleOutput>({
      ok: true,
      payload: result.getValue(),
    });
  }
}
```

Why this pattern works:

- handlers stay thin
- business logic is pushed into services/domain classes
- error propagation is predictable
- request/response shapes stay contract-driven

## Suggested Folder Structure for a New Project

If another project wants to reuse this setup, this structure is a sensible starting point:

```text
src/
  index.ts
  infra/
    BaseError.ts
    Result.ts
    GlobalErrorHandler.ts
    routes/
  handlers/
    <domain>/<verb>/
  shared/
    api/
      metadata/
      gen/
    websockets/
  db/
    my-sql/
    repositories/
  services/
  domain/
  sockets/
  tests/
```

## Suggested Reuse Rules

The parts most worth copying as-is:

- `BaseHandler` pattern
- `Result` pattern
- generated metadata-driven API contracts
- shared websocket event typing
- separation of handler/service/repository/domain

The parts that should be changed for most production use:

- password handling
- session secret and env config
- hardcoded CORS origin
- in-memory domain state if multi-node scaling matters
- route naming and HTTP verb choices if the next project wants a more RESTful API

## Current Risks and Limitations

These are important if this codebase is used as the basis for another project:

- passwords are not hashed
- session secret is hardcoded
- CORS is hardcoded to localhost
- game state is process-local and non-persistent
- some flows currently assume fixed room/table names such as `table_1`
- all routes are `POST`, including reads
- error code casing is not fully consistent in every path
- there is limited transaction handling around multi-step DB updates

## Recommended Improvements Before Reuse

If this architecture is used as a baseline for a new backend, these changes should be first:

1. Replace plain-text passwords with `bcrypt` or `argon2`
2. Move secrets and runtime configuration into env vars
3. Normalize error code casing and error mapping rules
4. Add proper logout/session invalidation flow
5. Decide whether live domain state should remain in memory or move to Redis/DB
6. Introduce transactions for multi-step DB writes where consistency matters
7. Decide whether to keep `domain.verb` routing or move toward more conventional REST/resource routes
8. Remove hardcoded table/room assumptions

## Development and Testing

Backend scripts:

```json
{
  "unit_tests": "TEST_RUNNER=true jest $npm_config_file",
  "db_tests": "DB_DATABASE=test_poker jest --config jest.config.db.js --runInBand --detectOpenHandles $npm_config_file",
  "api_tests": "TEST_RUNNER=true jest --config jest.config.api.js --runInBand --detectOpenHandles $npm_config_file",
  "dev": "nodemon",
  "lint": "eslint . --ext .ts"
}
```

Source:

- [backend/package.json](/Users/richardaspinall/Developer/projects/poker-react-node/backend/package.json)

## Summary

This backend is best understood as a contract-driven Express service with:

- generated endpoint contracts
- thin handlers
- explicit result/error flow
- session-backed auth
- websocket-based realtime updates
- in-memory live game state with MySQL-backed persistence for users and sessions

That makes it a strong base for another project if the new project values clear boundaries and fast iteration. The main architectural decision to revisit is whether live state should stay in memory or be moved into shared infrastructure for reliability and scale.
