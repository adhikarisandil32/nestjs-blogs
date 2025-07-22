import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../guards/authentication.guard';

export function AuthGuard() {
  return applyDecorators(UseGuards(AuthenticationGuard));
}
