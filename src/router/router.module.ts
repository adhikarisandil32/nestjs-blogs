import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { AdminRouterModule } from './routes/admin.route.module';
import { PublicRouterModule } from './routes/public.route.module';

@Module({
  imports: [
    AdminRouterModule,
    PublicRouterModule,
    NestRouterModule.register([
      {
        path: 'admin',
        module: AdminRouterModule,
      },
      {
        path: 'public',
        module: PublicRouterModule,
      },
    ]),
  ],
})
export class RouterModule {}
