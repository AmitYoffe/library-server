import { Logger, Module } from '@nestjs/common';
import { HttpExceptionFilter, LoggerMiddleware } from 'src/middleware';

@Module({
    providers: [Logger, LoggerMiddleware, HttpExceptionFilter],
    exports: [Logger, LoggerMiddleware, HttpExceptionFilter],
})

export class LoggerModule { }
