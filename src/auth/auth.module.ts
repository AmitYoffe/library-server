import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
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
    providers: [AuthService],
    controllers: [AuthController],
})

export class AuthModule { }
