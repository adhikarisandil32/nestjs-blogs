import { Injectable } from '@nestjs/common';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { FindOneOptions, FindOptionsOrder, Repository } from 'typeorm';
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
      const response = await this.todosRepository.insert(createTodosDto);

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

  async findAll({ searchParams }) {
    const sorting = {};
    // typeof Todos is important. Also see immediate below comment for more type in nest.
    const validSortKeys: (keyof Todos)[] = [
      'id',
      'title',
      'description',
      'isCompleted',
    ];

    // this is also a way to get types with FindOneOptins<Entity>, uncomment below and see for yourself
    /* const validSortKeys2: FindOneOptions<Todos>['select'] = {}; */

    if (searchParams.sort) {
      const [sortTitle, sortValue] = searchParams.sort.split('.');

      if (validSortKeys.includes(sortTitle)) sorting[sortTitle] = sortValue;
    }

    const data = await this.todosRepository.find({
      select: { id: true, isCompleted: true, title: true },
      order: { ...sorting },
    });

    return {
      message: 'Todos fetch success',
      status: 200,
      success: true,
      data,
    };
  }

  async findOne(id: number) {
    const data = await this.todosRepository.findOne({ where: { id } });

    return {
      message: 'Todos fetch success',
      status: 200,
      success: true,
      data,
    };
  }

  async update(id: number, updateTodosDto: UpdateTodosDto) {
    const updatedResult = await Promise.all([
      this.todosRepository.update({ id }, updateTodosDto),
      this.todosRepository.findOne({ where: { id } }),
    ]);

    return {
      message: 'Todo update success',
      status: 200,
      success: true,
      data: updatedResult[1],
    };
  }

  async remove(id: number) {
    try {
      await this.todosRepository.delete({ id });

      return {
        message: 'Todo delete success',
        status: 200,
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        message: error.message ?? 'Deletion Failed',
        status: 400,
        success: false,
        data: null,
      };
    }
  }
}
