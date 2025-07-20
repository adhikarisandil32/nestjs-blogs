import { Module } from '@nestjs/common';
import { CommonModules } from './common-modules/common.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [CommonModules, AuthModule, AdminsModule, UsersModule, TodosModule],
})
export class AppModule {}
