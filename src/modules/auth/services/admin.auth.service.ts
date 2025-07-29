import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { authDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admins } from 'src/modules/admins/entities/admin.entity';

@Injectable()
export class AuthServiceAdmin {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: authDto) {
    // const existingUser = await this._dataSource.manager
    //   .createQueryBuilder(Admins, 'admin')
    //   .leftJoinAndSelect('admin.role', 'roles')
    //   .select([
    //     'admin.id',
    //     'admin.name',
    //     'admin.email',
    //     'roles.id',
    //     'roles.role',
    //   ])
    //   .where('admin.email = :email', { email: authDto.email })
    //   .getOne();

    const existingUser = await this._dataSource.manager.findOne(Admins, {
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

  findMe(admin: Admins): Admins {
    return admin;
  }
}
