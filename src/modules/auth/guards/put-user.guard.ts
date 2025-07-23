import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/constants/user-roles.constant';
import { UsersServicePublic } from 'src/modules/users/services/public.users.service';
import { AdminsServiceAdmin } from 'src/modules/admins/services/admin.admins.service';

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
    private readonly _usersService: UsersServicePublic,
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

    const user = await this._usersService.findOne(decodedData.id);

    if (!user) throw new NotFoundException('request user not available');

    if (user.role.role !== UserRole.USER)
      throw new UnauthorizedException('unauthorized access');

    request['user'] = user;

    return;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    // private readonly _adminService: AdminsServiceAdmin,
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

    // const admin = await this._adminService.findOne(decodedData.id);

    // if (!admin) throw new NotFoundException('request user not available');

    // if (admin.role.role !== UserRole.ADMIN)
    //   throw new UnauthorizedException('unauthorized access');

    // request['user'] = admin;

    return;
  }
}
