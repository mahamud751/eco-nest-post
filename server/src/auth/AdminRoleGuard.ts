import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service'; // Ensure the correct import path

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.authService.verifyToken(request);
    if (user && user.isAdmin) {
      request.user = user; // Attach user info to request
      return true;
    } else {
      throw new ForbiddenException('You are not authorized!');
    }
  }
}
