import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { AuthController, AuthGuard, AuthService } from './';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: '12h' },
                };
            },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})

export class AuthModule { }
