import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from '../entities/todos.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/modules/users/entities/user.entity';
import { CreateTodosDto } from '../dto/create-todos.dto';
import { UpdateTodosDto } from '../dto/update-todos.dto';

@Injectable()
export class TodosServiceAdmin {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
  ) {}

  create(user: Users, createTodoDto: CreateTodosDto) {
    return {};
  }

  findAllPaginated(user: Users, { searchParams }) {
    return {};
  }

  findOne(user: Users, id: number) {
    return {};
  }

  update(user: Users, id: Number, updateTodosDto: UpdateTodosDto) {
    return {};
  }

  remove(user: Users, id: number) {
    return {};
  }
}
