import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        const log = {
            path: req.originalUrl,
            time: new Date().toLocaleString(),
            method: req.method,
            status: res.statusCode,
            body: req.body,
        };

        console.log(log);

        next();
    }
}