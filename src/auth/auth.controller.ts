import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }

  @Get('me')
  me() {
    return this.authService.findOne();
  }
}
