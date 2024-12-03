import { Global, Logger, Module } from '@nestjs/common';
import { HttpExceptionFilter, LoggerMiddleware } from 'src/middleware';

@Global()
@Module({
    providers: [Logger, LoggerMiddleware, HttpExceptionFilter],
    exports: [Logger, LoggerMiddleware, HttpExceptionFilter],
})

export class LoggerModule { }
// refactor the files and logic here !