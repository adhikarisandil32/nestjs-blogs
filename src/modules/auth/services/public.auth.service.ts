import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { authDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/modules/users/entities/user.entity';
import { UpdateUserPasswordDto } from 'src/modules/users/dto/update-user.dto';

@Injectable()
export class AuthServicePublic {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: authDto) {
    const existingUser = await this._dataSource.manager.findOne(Users, {
      where: {
        email: authDto.email,
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

    if (!existingUser)
      throw new UnauthorizedException("email or password does't match");

    const isPasswordVerified = await bcrypt.compare(
      authDto.password,
      existingUser.password,
    );

    if (!isPasswordVerified)
      throw new UnauthorizedException("email or password does't match");

    const accessToken = this.jwtService.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role_id: existingUser.role.id,
        role: existingUser.role.role,
      },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return { user: existingUser, accessToken };
  }

  findMe(user: Users): Users {
    return user;
  }

  async changePassword({
    user,
    passwords,
  }: {
    user: Users;
    passwords: UpdateUserPasswordDto;
  }) {
    const existingUser = await this._dataSource.manager.findOne(Users, {
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
      throw new UnauthorizedException("passwords doesn't match");
    }

    const userDto = this._dataSource.manager.create(Users, {
      password: passwords.newPassword,
    });

    await this._dataSource.manager.update(Users, user.id, userDto);

    return user;
  }
}
