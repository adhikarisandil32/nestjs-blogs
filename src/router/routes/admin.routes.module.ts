import { Module } from '@nestjs/common';
import { AdminsModule } from 'src/modules/admins/admins.module';
import { AdminsController } from 'src/modules/admins/controller/admin.admin-users.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthControllerAdmin } from 'src/modules/auth/controllers/admin.auth.controller';
import { PostsControllerAdmin } from 'src/modules/posts/controllers/admin.posts.controller';
import { PostsModule } from 'src/modules/posts/posts.module';
import { RolesController } from 'src/modules/roles/controllers/admin.roles.controller';
import { RolesModule } from 'src/modules/roles/roles.module';
import { TodosControllerAdmin } from 'src/modules/todos/controllers/admin.todos.controller';
import { TodosModule } from 'src/modules/todos/todos.module';
import { UsersControllerAdmin } from 'src/modules/users/controllers/admin.users.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    AdminsModule,
    TodosModule,
    RolesModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [
    AuthControllerAdmin,
    AdminsController,
    TodosControllerAdmin,
    RolesController,
    UsersControllerAdmin,
    PostsControllerAdmin,
  ],
})
export class AdminRouteModules {}
