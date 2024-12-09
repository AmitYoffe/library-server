import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    constructor(private readonly logger: Logger) { }

    logRequest(method: string, path: string, status: number) {
        this.logger.log(`HTTP ${method} ${path} - ${status}`);
    }

    logUserAction(username: string, action: string) {
        this.logger.log(`User Action: ${username} - ${action}`);
    }

    logError(message: any, stack?: string) {
        this.logger.error(message, stack);
    }
}
