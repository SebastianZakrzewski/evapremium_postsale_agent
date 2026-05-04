import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import type { Response } from 'express';

/** Global catch-all HTTP layer filter; forwards status and normalized JSON body. */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (!(exception instanceof HttpException)) {
      const err = exception instanceof Error ? exception : new Error(String(exception));
      this.logger.error(err.message, err.stack);
    }
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException
        ? exception.getResponse()
        : { statusCode: httpStatus, message: 'Internal server error' };
    response.status(httpStatus).json(payload);
  }
}
