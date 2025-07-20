import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todos.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { TodosControllerPublic } from './controllers/public.todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todos]), UsersModule],
  controllers: [TodosControllerPublic],
  providers: [TodosService, JwtService],
})
export class TodosModule {}
