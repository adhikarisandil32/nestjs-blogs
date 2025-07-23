import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';

@Injectable()
export class UsersServicePublic {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(user);

    const { password, ...others } = user;

    return others;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      select: {
        createdAt: true,
        deletedAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
        role: {
          id: true,
          role: true,
        },
      },
    });

    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        createdAt: true,
        deletedAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
        role: {
          id: true,
          role: true,
        },
      },
      relations: {
        role: true,
      },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove() {
    return `This action removes me`;
  }
}
