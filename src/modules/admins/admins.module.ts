import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from './entities/admin.entity';
import { AdminsServiceAdmin } from './services/admin.admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
  providers: [AdminsServiceAdmin],
  exports: [AdminsServiceAdmin],
})
export class AdminsModule {}
