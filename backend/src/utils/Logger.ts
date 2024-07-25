import chalk from 'chalk';
import debug from 'debug';

import { IBaseError } from '@infra/BaseError';

const infoLog = debug('APP:info');
const errorLog = debug('APP:error');
const debugLog = debug('APP:debug');

class Logger {
  // This is a wrapper for the debug module
  static newDebugger(namespace: string): debug.Debugger {
    return debug(namespace);
  }

  // The below functions are for direct use
  static info(message: string): void {
    infoLog(message);
  }

  static error(message: string): void {
    errorLog(message);
  }

  static debug(message: string): void {
    debugLog(message);
  }

  static stackTrace(error: IBaseError): void {
    const errorDetails = error.details ? JSON.stringify(error.details, null, 2) : null;
    const errorCodeAndDetails = `Code: ${error.code}` + (errorDetails ? `\nDetails: ${errorDetails}` : '');

    const separator = '-----------------------------------STACK TRACE-----------------------------------';
    const stack = error.stack || 'No stack trace available';

    console.log(`${chalk.green(errorCodeAndDetails)}\n${chalk.yellow(separator)}\n${chalk.yellow(stack)}`);
  }
}

export { Logger };
