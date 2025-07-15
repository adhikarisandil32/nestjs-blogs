import { applyDecorators, SetMetadata } from '@nestjs/common';

export function ResponseMessage(message: string) {
  return applyDecorators(SetMetadata('message', message));
}

export function ShowPagination(showPagination: boolean = true) {
  return applyDecorators(SetMetadata('showPagination', showPagination));
}
