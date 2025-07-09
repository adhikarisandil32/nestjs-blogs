import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './common-modules/database/database.module';

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
    TodosModule,
    UsersModule,
  ],
})
export class AppModule {}
