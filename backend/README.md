# backend notes

## Install

`npm install`

## Run

`npm run dev`

## Run tests:

`npm run test`

`npm run test --file={path_to_file}`

## Debugging

1. Open `src/index.ts` in VSCode
2. Head to debugger and select Current TS File

## Run

`./test-requests`

This has requests that can be sent within vscode to test the backend directly.

Github: https://github.com/Huachao/vscode-restclient/blob/master/README.md

Extension: humao.rest-client

---

## package.json package dependency details

```json
 "dependencies": {
    "dotenv": "^16.3.1", // allow for environment variables in .env file
    "express": "^4.18.2", // server framework
    "mysql2": "^3.6.5", // for working with mysql
    "socket.io": "^4.7.2" // socket library
  },
  "devDependencies": {
    // types for each library:
    "@types/chalk": "^2.2.0",
    "@types/debug": "^4.1.12",
    "@types/express": "^4.17.19",
    "@types/jest": "^29.5.5",
    "@types/node": "^20.8.4",
    "chalk": "^4.1.0", // colors for logging (using specifically version 4 for typescript)
    "cors": "^2.8.5", // allows for frontend to make requests to different servers other than the original server hosting the app
    "debug": "^4.3.4", // for debug logging
    "jest": "^29.7.0", // testing framework
    "nodemon": "^3.0.1", // automatic reloading
    "ts-jest": "^29.1.1", // enable testing in typescript
    "ts-node": "^10.9.1", // turns typescript into javascript
  }
```
