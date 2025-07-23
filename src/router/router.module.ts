import { Module } from '@nestjs/common';
import { RouterModule as NestRouter } from '@nestjs/core';
import { AdminRouteModules } from './routes/admin.routes.module';
import { PublicRouteModules } from './routes/public.routes.module';

@Module({
  imports: [
    AdminRouteModules,
    PublicRouteModules,
    NestRouter.register([
      {
        path: 'api/admin',
        module: AdminRouteModules,
      },
      {
        path: 'api/public-user',
        module: PublicRouteModules,
      },
    ]),
  ],
})
export class RouterModule {}
