import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TodosModule } from 'src/modules/todos/todos.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [AuthModule, TodosModule, UsersModule],
})
export class AdminRouterModule {}
