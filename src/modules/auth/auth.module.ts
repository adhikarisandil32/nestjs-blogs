import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AdminsModule } from '../admins/admins.module';
import { AuthServiceAdmin } from './services/admin.auth.service';
import { AuthServicePublic } from './services/public.auth.service';

@Module({
  imports: [
    AdminsModule,
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthServiceAdmin, AuthServicePublic, JwtService],
  exports: [AuthServiceAdmin, AuthServicePublic],
})
export class AuthModule {}
