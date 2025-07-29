import { Controller, Post, Body, Get } from '@nestjs/common';
import { authDto } from '../dto/auth.dto';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PutPublicUser } from '../decorator/put-user.decorator';
import { AuthServicePublic } from '../services/public.auth.service';
import { Users } from 'src/modules/users/entities/user.entity';
import { User } from 'src/common-modules/request/decorators/request.decorator';

@ApiTags('Authentication')
// @Controller(`${ControllerPrefix.PUBLIC}/auth`)
@Controller('auth')
export class AuthControllerPublic {
  constructor(private readonly authService: AuthServicePublic) {}

  @ResponseMessage('Login Success')
  @Post('login')
  // @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }

  @ResponseMessage('logged in user detail fetch success')
  @ApiBearerAuth()
  @PutPublicUser()
  @Get('me')
  me(@User() user: Users) {
    return this.authService.findMe(user);
  }
}
