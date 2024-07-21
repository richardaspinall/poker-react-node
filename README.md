# poker-react-node

poker game in react and node

# Install

1. Fork or download a local copy of the `poker-react-node` repo
2. Open a terminal window and use `cd` to navigate to the 'poker-react-node' folder
3. Run the following command in the terminal to install all of the requirements for the app: `npm run install:all` 

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

`DEBUG=APP:* npm run api_tests` shows debug logs when running tests

### Generic info, error and debugging:

Note: better to use the above namespacing for more specific logging

```js
import Logger from './Logger';

Logger.info('Some information');

Logger.error('Some error');

Logger.debug('Some debugging');

Logger.debugStack('Debugging with stack strace');
```

## Skipping husky (when commiting work):

`git commit --no-verify -m "message"`

## Refs:

## Packages:

Husky which is used to run commands when commiting (like run test suites)
https://www.npmjs.com/package/husky

## Installing MySQL and creating DB

1. `brew install mysql`
2. `brew services start mysql` (to stop: `brew services stop mysql`)
3. `mysql_secure_installation` (set a password)
4. `mysql -uroot -p<your-password>` (enter CLI)
5. `show databases;` (see all the databases)
6. do stuff: create, insert, query

- Ref: https://digestize.medium.com/how-to-install-mysql-in-your-macbook-m1-3d7753c26a26

### GUI

Optional: use a GUI – I had a lot of trouble finding a good one! but this worked great: https://dbeaver.io/download/

### Then create an env file

- Create a `.env` file in the `backend` directory with the following

```
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="<your-password>"
DB_DATABASE="dev_poker"
```

### Then create the DB

`npm run create-dev-db`

---
