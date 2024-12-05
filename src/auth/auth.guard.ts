import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedUser = this.jwtService.verify(
        token, { secret: this.configService.get("JWT_SECRET") }
      );

      request.user = decodedUser

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader({ headers }: Request): string | null {
    const authorizationHeader = headers['authorization'];

    if (!authorizationHeader) {
      return null;
    }

    const [type, token] = authorizationHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
