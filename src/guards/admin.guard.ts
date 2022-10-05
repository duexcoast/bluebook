import { CanActivate, ExecutionContext } from '@nestjs/common';
import { request } from 'http';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (!req.currentUser) {
      return false;
    }
    return req.currentUser.admin
  }
}
