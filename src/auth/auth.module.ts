import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { AuthController, AuthService } from './';
import { LoggerMiddleware } from 'src/middleware';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions:
                    {
                        expiresIn: configService.get<string>('TOKEN_EXPIRATION')
                    },
                };
            },
        }),
    ],
    providers: [
        AuthService,
        LoggerMiddleware,
        Logger
    ],
    controllers: [AuthController],
})

export class AuthModule { }
