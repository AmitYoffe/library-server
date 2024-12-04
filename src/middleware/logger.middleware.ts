import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: Logger) { }

    use(req: Request, res: Response, next: NextFunction) {

        const log = {
            method: req.method,
            status: res.statusCode,
            time: new Date().toLocaleString(),
            path: req.originalUrl,
        };

        this.logger.log(log);
        next();
    }

    logUserAction(username: string, action: string) {
        this.logger.log(`${username} - ${action}`);
    }
}
