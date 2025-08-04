import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todos.entity';
import { TodosServicePublic } from './services/public.todos.service';
import { TodosServiceAdmin } from './services/admin.todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  providers: [TodosServiceAdmin, TodosServicePublic],
  exports: [TodosServiceAdmin, TodosServicePublic],
})
export class TodosModule {}
