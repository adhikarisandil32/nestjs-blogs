import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from '../entities/todos.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/modules/users/entities/user.entity';
import { CreateTodosDto } from '../dto/create-todos.dto';
import { UpdateTodosDto } from '../dto/update-todos.dto';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';

@Injectable()
export class TodosServiceAdmin {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
  ) {}

  create(user: Users, createTodoDto: CreateTodosDto) {
    return {};
  }

  async findAllPaginated({
    userId,
    searchParams,
  }: {
    userId: number;
    searchParams: PaginatedQueryDto;
  }) {
    const data = await findAllPaginatedData<Todos>({
      ...searchParams,
      repo: this.todosRepository,
      validSearchFields: [],
      validSortFields: [],
      queryOptions: {
        where: {
          user: {
            id: userId,
          },
        },
        select: {
          id: true,
          title: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
          isCompleted: true,
        },
      },
    });

    return data;
  }

  async findOne(todosId: number) {
    const data = await this.todosRepository.findOne({
      where: {
        id: todosId,
      },
    });

    return data;
  }

  update(user: Users, id: Number, updateTodosDto: UpdateTodosDto) {
    return {};
  }

  remove(user: Users, id: number) {
    return {};
  }
}
