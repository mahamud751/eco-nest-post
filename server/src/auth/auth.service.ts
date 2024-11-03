import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(request: any) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
