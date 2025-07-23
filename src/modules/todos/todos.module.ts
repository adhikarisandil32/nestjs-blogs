import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todos.entity';
import { TodosControllerPublic } from './controllers/public.todos.controller';
import { TodosControllerAdmin } from './controllers/admin.todos.controller';
import { TodosService } from './services/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
