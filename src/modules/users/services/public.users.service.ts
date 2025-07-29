import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Admins } from 'src/modules/admins/entities/admin.entity';

@Injectable()
export class UsersServicePublic {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly _dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const [existingUserInUsers, existingUserInAdmins] = await Promise.all([
      this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      }),
      this._dataSource.manager.findOne(Admins, {
        where: {
          email: createUserDto.email,
        },
      }),
    ]);

    if (existingUserInUsers || existingUserInAdmins)
      throw new ConflictException('user already exists with this email');

    const preparedData = await this.prepareUserCreateData(createUserDto);

    const user = this.usersRepository.create(preparedData);

    await this.usersRepository.save(user);

    return user;
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
      relations: {
        role: true,
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

  async prepareUserCreateData(createUserDto: CreateUserDto) {
    const publicUserRole = await this._dataSource.manager.findOne(Roles, {
      where: {
        role: UserRole.USER,
      },
      select: {
        id: true,
        role: true,
      },
    });

    return {
      ...createUserDto,
      role: publicUserRole,
    };
  }
}
