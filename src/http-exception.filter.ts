
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const responseBody = exception.getResponse();
        const message = (typeof responseBody === 'string') ? responseBody : (responseBody['message'] || responseBody);
        const error = (typeof responseBody === 'object' && responseBody['error']) ? responseBody['error'] : 'Error';

        response.json({
            message: message,
            error: error,
            statusCode: status,
            timestamp: new Date().toLocaleTimeString(),
            path: request.url,
        });
    }
}
