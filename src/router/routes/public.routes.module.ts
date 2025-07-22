import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthControllerPublic } from 'src/modules/auth/controllers/public.auth.controller';
import { TodosControllerPublic } from 'src/modules/todos/controllers/public.todos.controller';
import { TodosModule } from 'src/modules/todos/todos.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [AuthModule, TodosModule, UsersModule],
  controllers: [AuthControllerPublic, TodosControllerPublic],
})
export class PublicRouteModules {}
