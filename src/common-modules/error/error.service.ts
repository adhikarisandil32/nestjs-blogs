import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
// import { MyLogger } from '../logger/logger.service';
import { Request, Response } from 'express';
import pino from 'pino';
import { PINO_LOGGER_CONSTANT } from '../logger/logger.constant';

@Catch()
export class ErrorService implements ExceptionFilter {
  constructor(
    @Inject(PINO_LOGGER_CONSTANT)
    private readonly _loggerService: pino.Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    // console.log(exceptionResponse, exception.stack);
    // console.log(exception);

    const errorMessage = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message?.[0]
      : exceptionResponse.message;

    this._loggerService.error(exceptionResponse, exception.stack);

    response.status(status).json({
      message: errorMessage || 'Request Failed',
      status: status ?? 500,
      success: status < 400,
      date: Date.now(),
      path: request.url,
    });
  }
}
