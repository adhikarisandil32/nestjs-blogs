import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { Todos } from './entities/todos.entity';
import { Request as IRequest } from 'express';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  async create(
    request: IRequest,
    createTodosDto: CreateTodosDto,
  ): Promise<Todos> {
    const newTodo = this.todosRepository.create({
      // title: createTodosDto.title,
      // isCompleted: createTodosDto.isCompleted,
      // description: createTodosDto.description,
      ...createTodosDto,
      user: request?.['user']?.id,
    });

    await this.todosRepository.save(newTodo);

    // if used this.todosRepository.insert(createTodosDto), then it doesn't need to be manually saved unlike above

    return newTodo;
  }

  async findAllPaginated(
    request: IRequest,
    { searchParams },
  ): Promise<{ data: Todos[]; count: number }> {
    const sorting = {};
    const validSortKeys: (keyof Todos)[] = [
      'id',
      'title',
      'description',
      'isCompleted',
    ];

    if (searchParams.sort) {
      const [sortTitle, sortValue] = searchParams.sort.split('.');

      if (validSortKeys.includes(sortTitle))
        sorting[sortTitle] = sortValue.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    }

    const currentPage =
      +(searchParams.page ?? 1) > 1 ? +(searchParams.page ?? 1) : 1;
    const limit = +(searchParams.limit ?? 10);
    const offset = (currentPage - 1) * limit;

    const [data, count] = await this.todosRepository.findAndCount({
      where: {
        user: {
          id: request?.['user'].id,
        },
      },
      select: { id: true, isCompleted: true, title: true },
      order: { ...sorting },
      take: limit,
      skip: offset,
    });

    return { data, count };
  }

  // async findAll({ searchParams }): Promise<Todos[]> {
  //   const sorting = {};
  //   // typeof Todos is important. Also see immediate below comment for more type in nest.
  //   const validSortKeys: (keyof Todos)[] = [
  //     'id',
  //     'title',
  //     'description',
  //     'isCompleted',
  //   ];

  //   // this is also a way to get types with FindOneOptions<Entity>, uncomment below and see for yourself
  //   // const validSortKeys2: FindOneOptions<Todos>['select'] = {};

  //   if (searchParams.sort) {
  //     const [sortTitle, sortValue] = searchParams.sort.split('.');

  //     if (validSortKeys.includes(sortTitle)) sorting[sortTitle] = sortValue;
  //   }

  //   const data = await this.todosRepository.find({
  //     select: { id: true, isCompleted: true, title: true },
  //     order: { ...sorting },
  //   });

  //   return data;
  // }

  async findOne(request: IRequest, id: number): Promise<Todos> {
    const requestUserId = request?.['user']?.id;

    const data = await this.todosRepository.findOne({
      where: {
        id,
        user: {
          id: requestUserId,
        },
      },
    });

    if (!data) {
      throw new NotFoundException('todo not found');
    }

    return data;
  }

  async update(
    request: IRequest,
    id: number,
    updateTodosDto: UpdateTodosDto,
  ): Promise<Todos> {
    const requestUserId = request?.['user']?.id;
    const afterUpdate = await this.todosRepository.update(
      {
        id,
        user: {
          id: requestUserId,
        },
      },
      updateTodosDto,
    );

    if (afterUpdate.affected <= 0) {
      throw new NotFoundException('todo not found');
    }

    const updatedResult = await this.todosRepository.findOne({
      where: {
        id,
      },
    });

    return updatedResult;
  }

  async remove(request: IRequest, id: number): Promise<null> {
    const requestUserId = request?.['user']?.id;

    await this.todosRepository.delete({ id, user: { id: requestUserId } });

    return null;
  }
}
