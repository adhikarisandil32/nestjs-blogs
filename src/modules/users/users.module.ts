import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersControllerAdmin } from './controllers/admin.users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersControllerAdmin],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
