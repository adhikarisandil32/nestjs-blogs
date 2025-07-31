import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Todos } from '../entities/todos.entity';
import { CreateTodosDto } from '../dto/create-todos.dto';
import { UpdateTodosDto } from '../dto/update-todos.dto';
import { Users } from 'src/modules/users/entities/user.entity';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';

@Injectable()
export class TodosServicePublic {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  async create(user: Users, createTodosDto: CreateTodosDto): Promise<Todos> {
    const newTodo = this.todosRepository.create({
      ...createTodosDto,
      user: {
        id: user.id,
      },
    });

    await this.todosRepository.save(newTodo);

    return newTodo;
  }

  async findAllPaginated({
    user,
    searchParams,
    validSortKeys,
    validSearchKeys,
  }: {
    user: Users;
    searchParams: PaginatedQueryDto;
    validSortKeys: (keyof Todos)[];
    validSearchKeys: (keyof Todos)[];
  }): Promise<[Todos[], number]> {
    const sorting = {};
    const search = {};

    if (validSortKeys.includes(searchParams.sortField as keyof Todos))
      sorting[searchParams.sortField] =
        searchParams.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (validSearchKeys.includes(searchParams.searchField as keyof Todos)) {
      search[searchParams.searchField] = ILike(
        `%${searchParams.search ?? ''}%`,
      );
    }

    const currentPage =
      +(searchParams.page ?? 1) > 1 ? +(searchParams.page ?? 1) : 1;
    const limit = +(searchParams.limit ?? 10);
    const offset = (currentPage - 1) * limit;

    const data = await this.todosRepository.findAndCount({
      where: {
        user: {
          id: user.id,
        },
        ...search,
      },
      select: { id: true, isCompleted: true, title: true },
      order: { ...sorting },
      take: limit,
      skip: offset,
    });

    return data;
  }

  async findOne(user: Users, id: number): Promise<Todos> {
    const data = await this.todosRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!data) {
      throw new NotFoundException('todo not found');
    }

    return data;
  }

  async update(
    user: Users,
    id: number,
    updateTodosDto: UpdateTodosDto,
  ): Promise<Todos> {
    const afterUpdate = await this.todosRepository.update(
      {
        id,
        user: {
          id: user.id,
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
        user: {
          id: user.id,
        },
      },
    });

    return updatedResult;
  }

  async remove(user: Users, id: number): Promise<null> {
    await this.todosRepository.delete({ id, user: { id: user.id } });

    return null;
  }
}
