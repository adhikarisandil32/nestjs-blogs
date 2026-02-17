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

  // transport: {target: "pino-roll"}. `pino-roll` can be used to create different log files on a defined frequency (say of daily, weekly, etc) to capture the logs of that specified frequency.
  providers: [
    {
      provide: PINO_LOGGER_CONSTANT,
      useFactory: () => {
        const logger = pino({
          transport: {
            target: 'pino/file',
            options: { destination: `./app.log`, append: false },
          },
        });

        return logger;
      },
    },
  ],
  exports: [PINO_LOGGER_CONSTANT],
})
export class LoggerModule {}
