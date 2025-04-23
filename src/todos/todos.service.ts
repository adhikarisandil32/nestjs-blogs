import { Injectable } from '@nestjs/common';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { Repository } from 'typeorm';
import { Todos } from './entities/todos.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  async create(createTodosDto: CreateTodosDto) {
    try {
      const response = this.todosRepository.insert(createTodosDto);

      // if used this.todosRepository.create(createTodosDto), then manually it has to be saved like below commented code.
      // await this.todosRepository.save(response);

      return {
        message: 'Todos created success',
        status: 200,
        success: true,
        data: [],
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        data: null,
      };
    }
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
