import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status: HttpStatus = exception.getStatus();

        const responseBody = exception.getResponse();
        const message = (typeof responseBody === 'string') ? responseBody : (responseBody['message'] || responseBody);
        const error = (typeof responseBody === 'object' && responseBody['error']) ? responseBody['error'] : 'Error';


        const exceptionInfo = {
            message: message,
            error: error,
            statusCode: status,
            timestamp: new Date().toLocaleTimeString(),
            path: request.url,
        }

        this.logger.error(exceptionInfo);
        response.status(status).send()
    }
}
