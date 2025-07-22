import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthControllerPublic } from './controllers/public.auth.controller';
import { AuthControllerAdmin } from './controllers/admin.auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthControllerAdmin, AuthControllerPublic],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
