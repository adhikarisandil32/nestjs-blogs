import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from '../logger/logger.module';
import { MyLogger } from '../logger/logger.service';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorService,
    },
    MyLogger,
  ],
})
export class ErrorFilterModule {}
