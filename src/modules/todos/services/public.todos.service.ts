import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Todos } from '../entities/todos.entity';
import { CreateTodosDto } from '../dto/create-todos.dto';
import { UpdateTodosDto } from '../dto/update-todos.dto';
import { Users } from 'src/modules/users/entities/user.entity';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';

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

  async findPaginated({
    user,
    searchParams,
  }: {
    user: Users;
    searchParams: PaginatedQueryDto;
  }): Promise<[Todos[], number]> {
    const data = await findAllPaginatedData<Todos>({
      ...searchParams,
      repo: this.todosRepository,
      validSearchFields: ['title'],
      validSortFields: ['title', 'createdAt', 'updatedAt'],
      queryOptions: {
        where: {
          user: {
            id: user.id,
          },
        },
        select: {
          id: true,
          isCompleted: true,
          title: true,
        },
      },
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
