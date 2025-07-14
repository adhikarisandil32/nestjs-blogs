import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './common-modules/database/database.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { ResponseModule } from './common-modules/response/respose.module';

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
    TodosModule,
    UsersModule,
  ],
})
export class AppModule {}
