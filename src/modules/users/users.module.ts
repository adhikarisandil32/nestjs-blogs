import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersServiceAdmin } from './services/admin.users.service';
import { UsersServicePublic } from './services/public.users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersServiceAdmin, UsersServicePublic],
  exports: [UsersServiceAdmin, UsersServicePublic],
})
export class UsersModule {}
