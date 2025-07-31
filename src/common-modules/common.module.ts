import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { ResponseModule } from './response/respose.module';
import { ErrorFilterModule } from './error/error.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ResponseModule,
    ErrorFilterModule,
  ],
})
export class CommonModules {}
