import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { authDto } from '../dto/auth.dto';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { ApiTags } from '@nestjs/swagger';
import { PutAdmin } from '../decorator/put-user.decorator';
import { AuthServiceAdmin } from '../services/admin.auth.service';
import { User } from 'src/common-modules/request/decorators/request.decorator';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { UpdateAdminPasswordDto } from 'src/modules/admins/dto/update-admin-user.dto';

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

  @ResponseMessage('detail fetch success')
  @PutAdmin()
  @Get('me')
  me(@User() admin: Admins) {
    return this.authService.findMe(admin);
  }

  @ResponseMessage('password changed')
  @PutAdmin()
  @Patch('change-password')
  changePassword(
    @User() admin: Admins,
    @Body() passwords: UpdateAdminPasswordDto,
  ) {
    return this.authService.changePassword({ admin, passwords });
  }
}
