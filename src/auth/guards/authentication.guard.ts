import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../modules/users/users.service';

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

    const { hasToken, message } = await this.verifyTokenAvailability(request);

    if (!hasToken) throw new UnauthorizedException(message);
    // return validateRequest(request);

    return true;
  }

  async verifyTokenAvailability(request: Request) {
    const [tokenType, token] = request.headers?.authorization?.split(' ') ?? [];

    if (!token || tokenType !== 'Bearer')
      return {
        hasToken: false,
        message: 'token unvavailable or token type mismatch',
      };

    const decodedData = this._jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this._usersService.findOne(decodedData.id);

    request['user'] = user;

    return {
      hasToken: true,
      message: null,
    };
  }
}
