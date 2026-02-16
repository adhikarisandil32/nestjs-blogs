import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorService,
    },
  ],
})
export class ErrorFilterModule {}
