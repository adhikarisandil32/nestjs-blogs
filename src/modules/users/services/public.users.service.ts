import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserPassword } from '../dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import * as bcrypt from 'bcryptjs';

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

  async update({
    user,
    updateUserDto,
  }: {
    user: Users;
    updateUserDto: UpdateUserDto;
  }) {
    const afterUpdate = await this.usersRepository.update(
      user.id,
      updateUserDto,
    );

    if (afterUpdate.affected <= 0) {
      throw new NotFoundException('user not found');
    }

    return await this.usersRepository.findOne({
      where: {
        id: user.id,
      },
      select: {
        role: {
          id: true,
          role: true,
        },
      },
      relations: {
        role: true,
      },
    });
  }

  async changePassword({
    user,
    passwords,
  }: {
    user: Users;
    passwords: UpdateUserPassword;
  }) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        id: user.id,
        email: user.email,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    const doesPasswordMatch = await bcrypt.compare(
      passwords.oldPassword,
      existingUser.password,
    );

    if (!doesPasswordMatch) {
      throw new UnauthorizedException("password doesn't match");
    }
    console.log({ doesPasswordMatch });

    const hashedNewPassword = await bcrypt.hash(passwords.newPassword, 10);

    await this.usersRepository.update(user.id, {
      password: hashedNewPassword,
    });

    return user;
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
