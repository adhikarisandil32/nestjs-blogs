import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './controller/admin.admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
