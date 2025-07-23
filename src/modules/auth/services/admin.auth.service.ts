import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { authDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Users } from 'src/modules/users/entities/user.entity';
import { Admins } from 'src/modules/admins/entities/admin.entity';

@Injectable()
export class AuthServiceAdmin {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: authDto) {
    const existingUser = await this._dataSource.manager.findOne(Admins, {
      where: {
        email: authDto.email,
      },
      select: {
        id: true,
        email: true,
        role: {
          id: true,
          role: true,
        },
      },
    });

    if (!existingUser) throw new NotFoundException("User Doesn't Exist");

    const isPasswordVerified = await bcrypt.compare(
      authDto.password,
      existingUser.password,
    );

    if (!isPasswordVerified)
      throw new UnauthorizedException("email or password does't match");

    const { password, ...otherData } = existingUser;

    const accessToken = this.jwtService.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role_id: existingUser.role.id,
        role: existingUser.role.role,
      },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return { ...otherData, accessToken };
  }

  findMe(request: Request): { data: Admins } {
    return request?.['user'];
  }
}
