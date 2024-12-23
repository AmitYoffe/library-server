import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { UserEntity } from 'src/users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async logIn(
    user: UserEntity,
    pass: string,
  ): Promise<{ access_token: string }> {
    const hash = await bcrypt.hash(pass, 10);
    const isMatch = await bcrypt.compare(user.password, hash);

    if (!isMatch) {
      throw new UnauthorizedException(
        `Password doesn't match that of ${user.username}'s`,
      );
    }

    this.loggerService.logUserAction(user.username, 'logged in');

    const payload = {
      sub: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  extractTokenFromHeader(requestHeaders: Headers): string | null {
    const authorizationHeader = requestHeaders['authorization'];

    if (!authorizationHeader) {
      return null;
    }

    const [type, token] = authorizationHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
