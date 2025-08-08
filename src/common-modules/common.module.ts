import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { ResponseModule } from './response/respose.module';
import { ErrorFilterModule } from './error/error.module';
import { CommonUsersModule } from 'src/modules/common-users/common-users.module';

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
    CommonUsersModule,
  ],
})
export class CommonModules {}
