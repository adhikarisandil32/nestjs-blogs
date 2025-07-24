import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard, PublicUserGuard } from '../guards/put-user.guard';

export function PutPublicUser() {
  return applyDecorators(UseGuards(PublicUserGuard));
}

export function PutAdmin() {
  return applyDecorators(UseGuards(AdminGuard));
}
