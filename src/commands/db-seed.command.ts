import { Command, CommandRunner } from 'nest-commander';
import { MyLogger } from '../common-modules/logger.service';

@Command({ name: 'hello', description: 'a hello command' })
export class SeedDatabase extends CommandRunner {
  constructor(private readonly _loggerService: MyLogger) {
    super();
  }

  async run(): Promise<void> {
    return this._loggerService.log(
      `Hello, Nest Developer, time: ${new Date().toISOString()}`,
    );
  }
}
