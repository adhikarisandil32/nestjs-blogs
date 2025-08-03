import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { authDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { UpdateAdminPasswordDto } from 'src/modules/admins/dto/update-admin-user.dto';

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

  async changePassword({
    admin,
    passwords,
  }: {
    admin: Admins;
    passwords: UpdateAdminPasswordDto;
  }) {
    const existingUser = await this._dataSource.manager.findOne(Admins, {
      where: {
        id: admin.id,
        email: admin.email,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('admin not found');
    }

    const doesPasswordMatch = await bcrypt.compare(
      passwords.oldPassword,
      existingUser.password,
    );

    if (!doesPasswordMatch) {
      throw new UnauthorizedException("passwords don't match");
    }

    const adminDto = this._dataSource.manager.create(Admins, {
      password: passwords.newPassword,
    });

    await this._dataSource.manager.update(Admins, admin.id, adminDto);

    return admin;
  }
}
