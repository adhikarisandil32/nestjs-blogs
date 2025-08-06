import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthControllerPublic } from 'src/modules/auth/controllers/public.auth.controller';
import { PostsControllerPublic } from 'src/modules/posts/controllers/public-user.posts.controller';
import { PostsModule } from 'src/modules/posts/posts.module';
import { TodosControllerPublic } from 'src/modules/todos/controllers/public.todos.controller';
import { TodosModule } from 'src/modules/todos/todos.module';
import { UsersControllerPublic } from 'src/modules/users/controllers/public.users.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [AuthModule, TodosModule, UsersModule, PostsModule],
  controllers: [
    AuthControllerPublic,
    TodosControllerPublic,
    UsersControllerPublic,
    PostsControllerPublic,
  ],
})
export class PublicRouteModules {}
