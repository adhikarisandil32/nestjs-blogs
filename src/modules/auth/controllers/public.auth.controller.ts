import {
  Controller,
  Post,
  Body,
  Get,
  Request as NestRequest,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { authDto } from '../dto/auth.dto';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { AuthGuard } from '../decorator/auth-guard.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Authentication')
// @Controller(`${ControllerPrefix.PUBLIC}/auth`)
@Controller('auth')
export class AuthControllerPublic {
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
