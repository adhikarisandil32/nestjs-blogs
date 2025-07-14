import { Module } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class ResponseModule {}
