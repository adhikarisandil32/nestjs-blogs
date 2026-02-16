import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ResponseModule } from './response/respose.module';
import { ErrorFilterModule } from './error/error.module';
// import { CommonUsersModule } from 'src/modules/common-users/common-users.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ResponseModule,
    ErrorFilterModule,
    // CommonUsersModule,
  ],
})
export class CommonModules {}
