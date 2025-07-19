import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

interface IJwtPayload {
  id: number;
  email: string;
}
@Injectable()
export class AuthencationGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,
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

    request['user'] = user;

    return;
  }
}
