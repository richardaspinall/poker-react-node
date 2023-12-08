# poker-react-node

poker game in react and node

# Install

`npm run install:all` (installs all requirements for apps)

## Run

`npm run start:dev` (runs the frontend and backend at the same time)

## Debugging

https://www.npmjs.com/package/debug

### How to instrument

1. Add `import Logger from './Logger';`
2. Create namespace `const socketsDebug = Logger.newDebugger('APP:Sockets');`
3. Call the logger `socketsDebug('Socket failed to connect')`

### Running with debugging turned on

`npm run start:debug` displays logs under the main app namespace (`APP:*`)

`NAMESPACE=APP:Sockets npm run start:debug-only` displays only logs in the sockets namespace (`APP:Sockets`)

### Generic info, error and debugging:

Note: better to use the above namespacing for more specific logging

```js
import Logger from './Logger';

Logger.info('Some information');

Logger.error('Some error');

Logger.debug('Some debugging');

Logeger.debugStack('Debugging with stack strace');
```

## Skipping husky (when commiting work):

`git commit --no-verify -m "message"`

## Refs:

## Packages:

Husky which is used to run commands when commiting (like run test suites)
https://www.npmjs.com/package/husky
