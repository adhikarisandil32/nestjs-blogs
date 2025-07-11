import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { authDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _dataSource: DataSource) {}

  async login(authDto: authDto) {
    const existingUser = await this._dataSource.manager.findOne(Users, {
      where: {
        email: authDto.email,
      },
      select: {
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        id: true,
        name: true,
      },
    });

    if (!existingUser) throw new NotFoundException("User Doesn't Exist");

    return {
      message: 'User Login success',
      status: 200,
      success: true,
      data: existingUser,
    };
  }

  findOne() {
    return `This action returns a logged in auth`;
  }
}
