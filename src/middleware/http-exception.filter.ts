import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly loggerService: LoggerService) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status: HttpStatus = exception.getStatus();
        const message = exception.getResponse();

        const log = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        }

        this.loggerService.logError({ log });
        response.status(status).json({ log });
    }
}
