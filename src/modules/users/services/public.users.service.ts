import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { CommonUser } from 'src/modules/common-users/entities/common-user.entity';

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

    await Promise.all([
      this.usersRepository.save(user),
      this._dataSource.manager.save(CommonUser, user),
    ]);

    return user;
  }

  async update({
    user,
    updateUserDto,
  }: {
    user: Users;
    updateUserDto: UpdateUserDto;
  }) {
    const [afterUpdate, _] = await Promise.all([
      this.usersRepository.update(user.id, updateUserDto),
      this._dataSource.manager.update(
        CommonUser,
        { email: user.email },
        updateUserDto,
      ),
    ]);

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
