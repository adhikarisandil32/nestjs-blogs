import {
  Controller,
  Post,
  Body,
  Get,
  Request as NestRequest,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { AuthGuard } from './decorator/auth-guard.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage('Login Success')
  @Post('login')
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }

  @ResponseMessage('logged in user detail fetch success')
  @AuthGuard()
  @ApiBearerAuth()
  @Get('me')
  me(@NestRequest() request: Request) {
    return this.authService.findMe(request);
  }
}
