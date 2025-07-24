import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersServicePublic } from '../services/public.users.service';

@ApiTags('Users')
// @Controller(`${ControllerPrefix.PUBLIC}/users`)
@Controller('users')
export class UsersControllerPublic {
  constructor(private readonly usersService: UsersServicePublic) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('me')
  remove() {
    return this.usersService.remove();
  }
}
