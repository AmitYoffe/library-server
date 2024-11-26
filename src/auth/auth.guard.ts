import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token, { secret: this.configService.get("JWT_SECRET") }
      );

      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const isUserAdmin: boolean = request.user.isAdmin;
    return isUserAdmin;
  }

  private extractTokenFromHeader({ headers }: Request): string | undefined {
    const authorizationHeader = headers['authorization'];

    if (!authorizationHeader) {
      return undefined;
    }

    const [type, token] = authorizationHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
