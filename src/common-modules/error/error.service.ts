import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MyLogger } from '../logger.service';
import { Request, Response } from 'express';

@Catch()
export class ErrorService implements ExceptionFilter {
  constructor(private readonly _loggerService: MyLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    // console.log(exceptionResponse, exception.stack);
    // console.log(exception);

    const errorMessage = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message.join(', ')
      : exceptionResponse.message;

    this._loggerService.error(exceptionResponse, exception.stack, 'app-error');

    response.status(status).json({
      message: errorMessage || 'Request Failed',
      status,
      success: status < 400,
      date: Date.now(),
      path: request.url,
    });
  }
}
