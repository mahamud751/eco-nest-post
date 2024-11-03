import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service'; // Inject your Prisma service

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, // Inject Prisma
  ) {}

  async login(user: any) {
    // Create the payload with the user ID, username, and role
    const payload = { sub: user.id, username: user.username, role: user.role };

    // Generate the token with the payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // Query the user from the database using Prisma
    const user = await this.findUserByUsername(username);

    // Validate the password here (this is an example, implement your own logic)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result; // The user object should include the role
    }
    return null;
  }

  // Implement the findUserByUsername method
  async findUserByUsername(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email }, // Assuming 'username' here is actually an email
    });
  }
}
