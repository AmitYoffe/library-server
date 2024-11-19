import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isUserAdmin: boolean = request.user.isAdmin;
    // request.user is undefined for some reason

    return isUserAdmin;
    // return true;
  }
}


// Todo: I should add an isAdmin permission check for EVERY request throughout the project,
// need to also check if a user is even logged in and apply logic accordingly.

