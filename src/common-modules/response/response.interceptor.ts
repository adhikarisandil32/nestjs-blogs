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
import { PaginatedQueryDto } from '../swagger-docs/paginate-query.dto';
import { plainToInstance } from 'class-transformer';

export class ResponseInterceptor implements NestInterceptor {
  constructor(@Inject() private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((dataFromService) => {
        const ctx = context.switchToHttp();
        const response: Response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        const requestQuery = plainToInstance(PaginatedQueryDto, request.query);

        const message = this._reflector.get('message', context.getHandler());
        const showPagination = this._reflector.get(
          'showPagination',
          context.getHandler(),
        );

        let data: any, count: number;
        if (Array.isArray(dataFromService)) {
          [data, count] = dataFromService;
        } else {
          data = dataFromService;
        }

        if (!showPagination || count == null) {
          return {
            message: message ?? 'Request Success',
            status: response.statusCode,
            success: response.statusCode < 400,
            ...(data ? { data } : {}),
          };
        }

        let _paginationMetadata: IPaginationMetadata;

        // console.log({ queryParams: requestQuery.skipPagination });

        if (requestQuery?.skipPagination) {
          _paginationMetadata = {
            total: count,
            limit: 0,
            page: 0,
            totalPage: 0,
            prevPage: null,
            nextPage: null,
            skipPagination: true,
          };
        } else {
          _paginationMetadata = {
            total: count,
            limit: requestQuery.limit ?? 10,
            page: requestQuery.page ?? 1,
            get totalPage() {
              return Math.ceil(count / this.limit);
            },
            get prevPage() {
              return this.page <= 1 ? null : this.page - 1;
            },
            get nextPage() {
              return this.page >= this.totalPage ? null : this.page + 1;
            },
          };
        }

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
