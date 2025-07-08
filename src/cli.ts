import { CommandFactory } from 'nest-commander';
import { CliModule } from './commands/cli.module';

async function bootstrap() {
  // await CommandFactory.run(AppModule);

  // or, if you only want to print Nest's warnings and errors
  await CommandFactory.run(CliModule, ['warn', 'error']);
}

bootstrap();
