// External
import debug from 'debug';
import chalk from 'chalk';

const infoLog = debug('APP:info');
const errorLog = debug('APP:error');
const debugLog = debug('APP:debug');

class Logger {
  // This is a wrapper for the debug module
  newDebugger(namespace: string): debug.Debugger {
    return debug(namespace);
  }

  // The below functions are for direct use
  info(message: string): void {
    infoLog(message);
  }

  error(message: string): void {
    errorLog(message);
  }

  debug(message: any): void {
    debugLog(message);
  }

  debugStack(message: string): void {
    const error = new Error(message);
    debugLog(chalk.yellow('---STACK TRACE---:'), chalk.white(error.stack));
  }
}
const LoggerInstance = new Logger();

export { LoggerInstance as Logger };
