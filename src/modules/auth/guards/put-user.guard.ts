import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/constants/user-roles.constant';
import { DataSource } from 'typeorm';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { Users } from 'src/modules/users/entities/user.entity';

export interface IJwtPayload {
  id: number;
  email: string;
  role_id: number;
  role: string;
}

@Injectable()
export class PublicUserGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest<Request>();
    // const response = ctx.getResponse<Response>();

    try {
      await this.verifyTokenAvailabilityAndAddUser(request);
      return true;
    } catch (error) {
      throw error;
    }
  }

  protected async verifyTokenAvailabilityAndAddUser(request: Request) {
    const [tokenType, token] = request.headers?.authorization?.split(' ') ?? [];

    // console.log({ tokenType, token });

    if (!token || tokenType !== 'Bearer')
      throw new UnauthorizedException('token unavailable');

    const decodedData = this._jwtService.verify<IJwtPayload>(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this._dataSource.manager.findOne(Users, {
      where: {
        id: decodedData.id,
        email: decodedData.email,
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

    if (!user) throw new UnauthorizedException('unauthorized access');

    if (user.role.role !== UserRole.USER)
      throw new UnauthorizedException('unauthorized access');

    delete user.password;

    request['user'] = user;

    return;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest<Request>();
    // const response = ctx.getResponse<Response>();

    try {
      await this.verifyTokenAvailabilityAndAddUser(request);
      return true;
    } catch (error) {
      throw error;
    }
  }

  protected async verifyTokenAvailabilityAndAddUser(request: Request) {
    const [tokenType, token] = request.headers?.authorization?.split(' ') ?? [];

    // console.log({ tokenType, token });

    if (!token || tokenType !== 'Bearer')
      throw new UnauthorizedException('token unavailable');

    const decodedData = this._jwtService.verify<IJwtPayload>(token, {
      secret: process.env.JWT_SECRET,
    });

    const admin = await this._dataSource.manager.findOne(Admins, {
      where: {
        id: decodedData.id,
        email: decodedData.email,
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

    if (!admin) throw new UnauthorizedException('unauthorized access');

    if (admin.role.role !== UserRole.ADMIN)
      throw new UnauthorizedException('unauthorized access');

    delete admin.password;

    request['user'] = admin;

    return;
  }
}
