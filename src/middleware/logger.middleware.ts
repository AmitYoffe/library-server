import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly loggerService: LoggerService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const statusCode = res.statusCode;

        res.on('finish', () => {
            this.loggerService.logRequest(method, originalUrl, statusCode);
        });

        next();
    }
}
