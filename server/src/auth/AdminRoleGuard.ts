import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found.');
    }

    console.log('User Role:', user.role); // Debugging

    if (user.role === 'superAdmin' || user.role === 'admin') {
      return true;
    }

    throw new ForbiddenException('Access denied. Admins only.');
  }
}
