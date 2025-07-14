import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { authDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { Users } from '../modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: authDto) {
    const existingUser = await this._dataSource.manager.findOne(Users, {
      where: {
        email: authDto.email,
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
      { id: existingUser.id, email: existingUser.email },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return {
      message: 'User Login success',
      status: 200,
      success: true,
      data: { ...otherData, accessToken },
    };
  }

  findOne() {
    return `This action returns a logged in auth`;
  }
}
