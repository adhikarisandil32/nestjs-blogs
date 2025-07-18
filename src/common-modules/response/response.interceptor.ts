import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { IPaginationMetadata } from './interfaces/pagination-metadata.interface';

export class ResponseInterceptor implements NestInterceptor {
  constructor(@Inject() private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((dataAndCount) => {
        const ctx = context.switchToHttp();
        const response: Response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        const message = this._reflector.get('message', context.getHandler());
        const showPagination = this._reflector.get(
          'showPagination',
          context.getHandler(),
        );

        const { data, count } = dataAndCount ?? {};

        if (!showPagination || count == null) {
          return {
            message,
            status: response.statusCode,
            success: response.statusCode < 400,
            data: dataAndCount,
          };
        }

        const _paginationMetadata: IPaginationMetadata = {
          total: count,
          limit: Number(request.query?.limit ?? 10),
          page: Number(request.query?.page ?? 1),
          get totalPage() {
            return Math.ceil(count / this.limit);
          },
          get nextPage() {
            return this.page >= this.totalPage ? null : this.page + 1;
          },
          get prevPage() {
            return this.page <= 1 ? null : this.page - 1;
          },
        };

        return {
          message: message ?? 'Request Success',
          status: response.statusCode,
          success: response.statusCode < 400,
          data,
          _pagination: _paginationMetadata,
        };
      }),
    );
  }
}
