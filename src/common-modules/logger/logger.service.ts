// As pino logs directly into the file, this is not used. if we want to use it to log into the terminal, that can be done.

import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  log(message: any, context?: string) {
    if (
      context !== 'RouterExplorer' &&
      context !== 'NestApplication' &&
      context !== 'InstanceLoader' &&
      context !== 'RoutesResolver' &&
      context !== 'NestFactory'
    ) {
      super.log(message, context);
    }
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }
}
