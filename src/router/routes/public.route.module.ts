import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TodosModule } from 'src/modules/todos/todos.module';

@Module({
  imports: [AuthModule, TodosModule],
})
export class PublicRouterModule {}
