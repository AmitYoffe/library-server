import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerMiddleware } from 'src/middleware';
import { UserService } from 'src/users';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly loggingService: LoggerMiddleware
    ) { }

    async logIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        this.loggingService.logUserAction(user.username, "logged in");

        const payload = { sub: user.id, username: user.username, isAdmin: user.isAdmin };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
