import { Injectable } from '@nestjs/common';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';

@Injectable()
export class TodosService {
  create(createTodosDto: CreateTodosDto) {
    console.log(createTodosDto);
    return {
      message: 'Todos created success',
      status: 200,
      success: true,
      data: [],
    };
  }

  findAll({ searchParams }) {
    return {
      message: 'Todos fetch success',
      status: 200,
      success: true,
      data: [],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodosDto: UpdateTodosDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
