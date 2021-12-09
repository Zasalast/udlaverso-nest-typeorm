import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../models/roles.model';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { PayloadToken } from './../models/token.model'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private refletor: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.refletor.get<Role[]>(ROLES_KEY, context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role)
    if (!isAuth) {
      throw new UnauthorizedException('You do not have permissions to perform this action ')
    }
    return isAuth;
  }
}
