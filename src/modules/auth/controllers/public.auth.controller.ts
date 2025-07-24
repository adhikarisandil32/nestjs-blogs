import {
  Controller,
  Post,
  Body,
  Get,
  Request as NestRequest,
} from '@nestjs/common';
import { authDto } from '../dto/auth.dto';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PutPublicUser } from '../decorator/put-user.decorator';
import { AuthServicePublic } from '../services/public.auth.service';

@ApiTags('Authentication')
// @Controller(`${ControllerPrefix.PUBLIC}/auth`)
@Controller('auth')
export class AuthControllerPublic {
  constructor(private readonly authService: AuthServicePublic) {}

  @ResponseMessage('Login Success')
  @Post('login')
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }

  @ResponseMessage('logged in user detail fetch success')
  @ApiBearerAuth()
  @PutPublicUser()
  @Get('me')
  me(@NestRequest() request: Request) {
    return this.authService.findMe(request);
  }
}
