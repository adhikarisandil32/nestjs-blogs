import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { authDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Users } from 'src/modules/users/entities/user.entity';

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

    delete existingUser.password;

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

  findMe(request: Request): { data: Users } {
    return request?.['user'];
  }
}
