// previously installed command module

// import { CommandFactory } from 'nest-commander';
// import { CliModule } from './commands/cli.module';

// async function bootstrap() {
//   // await CommandFactory.run(AppModule);

//   // or, if you only want to print Nest's warnings and errors
//   await CommandFactory.run(CliModule, ['warn', 'error']);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { CliModule } from './commands/cli.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule, {
    logger: ['error', 'warn'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
  } catch (error) {
    console.log(error);
    app.close();
  }
  process.exit(0);
}

bootstrap();
