import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { Todos } from './entities/todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  async create(createTodosDto: CreateTodosDto): Promise<{ data: Todos }> {
    const newTodo = this.todosRepository.create(createTodosDto);
    await this.todosRepository.save(newTodo);

    // if used this.todosRepository.insert(createTodosDto), then it doesn't need to be manually saved unlike above

    return {
      data: newTodo,
    };
  }

  async findAllPaginated({
    searchParams,
  }): Promise<{ data: Todos[]; count: number }> {
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
      select: { id: true, isCompleted: true, title: true },
      order: { ...sorting },
      take: limit,
      skip: offset,
    });

    return { data, count };
  }

  async findAll({ searchParams }): Promise<{ data: Todos[] }> {
    const sorting = {};
    // typeof Todos is important. Also see immediate below comment for more type in nest.
    const validSortKeys: (keyof Todos)[] = [
      'id',
      'title',
      'description',
      'isCompleted',
    ];

    // this is also a way to get types with FindOneOptions<Entity>, uncomment below and see for yourself
    // const validSortKeys2: FindOneOptions<Todos>['select'] = {};

    if (searchParams.sort) {
      const [sortTitle, sortValue] = searchParams.sort.split('.');

      if (validSortKeys.includes(sortTitle)) sorting[sortTitle] = sortValue;
    }

    const data = await this.todosRepository.find({
      select: { id: true, isCompleted: true, title: true },
      order: { ...sorting },
    });

    return {
      data,
    };
  }

  async findOne(id: number): Promise<{ data: Todos }> {
    const data = await this.todosRepository.findOne({
      where: { id },
    });

    return { data };
  }

  async update(
    id: number,
    updateTodosDto: UpdateTodosDto,
  ): Promise<{ data: Todos }> {
    await this.todosRepository.update({ id }, updateTodosDto);

    const updatedResult = await this.todosRepository.findOne({
      where: {
        id,
      },
    });

    return {
      data: updatedResult,
    };
  }

  async remove(id: number): Promise<{ data: null }> {
    await this.todosRepository.delete({ id });

    return {
      data: null,
    };
  }
}
