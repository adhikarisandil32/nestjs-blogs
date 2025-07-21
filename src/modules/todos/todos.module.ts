import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todos.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TodosControllerPublic } from './controllers/public.todos.controller';
import { TodosControllerAdmin } from './controllers/admin.todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todos]), UsersModule],
  controllers: [TodosControllerPublic, TodosControllerAdmin],
  providers: [TodosService, JwtService],
})
export class TodosModule {}
