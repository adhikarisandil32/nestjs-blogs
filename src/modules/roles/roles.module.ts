import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesControllerAdmin } from './controllers/admin.roles.controller';

@Module({
  controllers: [RolesControllerAdmin],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
