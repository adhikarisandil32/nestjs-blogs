import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { ResponseModule } from './response/respose.module';
import { AuthModule } from 'src/modules/auth/auth.module';

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
    AuthModule,
  ],
})
export class CommonModules {}
