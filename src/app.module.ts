import { Module } from '@nestjs/common';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModules } from './common-modules/common.module';
import { AdminsModule } from './modules/admins/admins.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [CommonModules, TodosModule, UsersModule, AdminsModule, RolesModule],
})
export class AppModule {}
