import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log("token: ", token)

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get("JWT_SECRET")
        }
      );
      // request['user'] = payload;
      console.log(" request.user: ", request.user)

      request.user = payload;
      console.log("payload: ", payload)

    } catch {
      throw new UnauthorizedException();
    }


    const isUserAdmin: boolean = request.user.isAdmin;
    console.log("isUserAdmin: ", isUserAdmin)

    return isUserAdmin;
    // return true;
  }

  private extractTokenFromHeader({ headers }: Request): string | undefined {
    const authorizationHeader = headers['Authorization'];

    if (!authorizationHeader) {
      return undefined;
    }

    const [type, token] = authorizationHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// Todo: 1) apply logic that checks if user is admin for some group of requests on the page
// Read more about the bearer token and apply it's logic so i can attach the user into the request and use the isAdmin field

// 2) need to also check if a user is even logged in and apply logic accordingly.
