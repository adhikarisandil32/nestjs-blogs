import { Module } from '@nestjs/common';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModules } from './common-modules/common.module';

@Module({
  imports: [CommonModules, TodosModule, UsersModule],
})
export class AppModule {}
