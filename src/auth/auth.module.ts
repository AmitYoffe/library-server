import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthService } from './auth.service';

@Module({
    imports: [
        LoggerModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => (
                {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions:
                    {
                        expiresIn: configService.get<string>('TOKEN_EXPIRATION')
                    },
                })
        }),
    ],
    exports: [JwtModule, AuthService],
    providers: [AuthService],
})

export class AuthModule { }
