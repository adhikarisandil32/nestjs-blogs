import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard, PublicUserGuard } from '../guards/put-user.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function PutPublicUser() {
  return applyDecorators(ApiBearerAuth(), UseGuards(PublicUserGuard));
}

export function PutAdmin() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AdminGuard));
}
