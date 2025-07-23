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
import { PutAdmin } from '../decorator/put-user.decorator';
import { AuthServiceAdmin } from '../services/admin.auth.service';

@ApiTags('Authentication')
// @Controller(`${ControllerPrefix.ADMIN}/auth`)
@Controller('auth')
export class AuthControllerAdmin {
  constructor(private readonly authService: AuthServiceAdmin) {}

  @ResponseMessage('Login Success')
  @Post('login')
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }

  @ResponseMessage('logged in user detail fetch success')
  @PutAdmin()
  @ApiBearerAuth()
  @Get('me')
  me(@NestRequest() request: Request) {
    return this.authService.findMe(request);
  }
}
