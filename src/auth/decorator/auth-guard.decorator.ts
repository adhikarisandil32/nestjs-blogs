import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthencationGuard } from '../guards/authentication.guard';

export function AuthGuard() {
  return applyDecorators(UseGuards(AuthencationGuard));
}
