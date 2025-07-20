import { Module } from '@nestjs/common';
import { CommonModules } from './common-modules/common.module';
import { RouterModule } from './router/router.module';

@Module({
  imports: [CommonModules, RouterModule],
})
export class AppModule {}
