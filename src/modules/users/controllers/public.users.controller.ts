import { Controller, Post, Body, Patch } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersServicePublic } from '../services/public.users.service';
import { User } from 'src/common-modules/request/decorators/request.decorator';
import { Users } from '../entities/user.entity';
import { PutPublicUser } from 'src/modules/auth/decorator/put-user.decorator';

@ApiTags('Users')
// @Controller(`${ControllerPrefix.PUBLIC}/users`)
@Controller('users')
export class UsersControllerPublic {
  constructor(private readonly usersService: UsersServicePublic) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @PutPublicUser()
  @Patch('update/me')
  update(@User() user: Users, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ user, updateUserDto });
  }
}
