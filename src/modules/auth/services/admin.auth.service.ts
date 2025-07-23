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
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { Roles } from 'src/modules/roles/entities/role.entity';

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
        role: {
          id: true,
          role: true,
        },
      },
      relations: {
        role: true,
      },
    });

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

  findMe(request: Request): Admins {
    return request?.['user'];
  }
}
