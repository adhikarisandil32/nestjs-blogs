import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage('Login Success')
  @Post('login')
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }

  @ResponseMessage('User fetch success')
  @Get('me')
  me() {
    return this.authService.findOne();
  }
}
