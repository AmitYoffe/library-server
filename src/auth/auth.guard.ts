import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get('isPublic', context.getClass());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request.headers);
    // and no current user logged?
    if (!token) throw new UnauthorizedException('No token found in headers');

    try {
      const decodedUser = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request.user = decodedUser;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private extractTokenFromHeader(headers: Headers): string | null {
    const authorizationHeader = headers['authorization'];

    if (!authorizationHeader) {
      return null;
    }

    const [type, token] = authorizationHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
