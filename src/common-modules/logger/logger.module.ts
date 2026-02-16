import { Module } from '@nestjs/common';
import { PINO_LOGGER_CONSTANT } from './logger.constant';
import pino from 'pino';

@Module({
  // imports: [
  //   PinoLoggerModule.forRoot({
  //     pinoHttp: {
  //       transport: {
  //         target: 'pino/file',
  //         options: {
  //           destination: './app.log',
  //         },
  //       },
  //     },
  //   }),
  // ],
  providers: [
    {
      provide: PINO_LOGGER_CONSTANT,
      useFactory: () => {
        const logger = pino({
          transport: {
            target: 'pino/file',
            options: { destination: `./app.log` },
          },
        });

        return logger;
      },
    },
  ],
  exports: [PINO_LOGGER_CONSTANT],
})
export class LoggerModule {}
