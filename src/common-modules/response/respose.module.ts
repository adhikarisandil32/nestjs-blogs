import { Module } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

// READ `Binding Interceptors` for using it globally from here: https://docs.nestjs.com/interceptors#binding-interceptors
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
