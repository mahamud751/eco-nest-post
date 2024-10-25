// users.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Prisma, Product, UserRole } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditLogService } from 'src/audit/audit.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user: any; token: string }> {
    const { name, address, email, phone, password, role, branch, photos } =
      createUserDto;
    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User with email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        address,
        email,
        phone,
        role: role as UserRole,
        password: hashedPassword,
        branchId: branch,
        photos: photoObjects,
      },
    });

    const token = jwt.sign(
      { name: user.name, id: user.id },
      this.configService.get('JWT_SECRET'),
      { expiresIn: '1h' },
    );
    return { user, token };
  }

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ token: string; user: Partial<any> }> {
    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { branch: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === 'blocked' || user.status === 'deactive') {
      throw new UnauthorizedException(
        'User is blocked or deactivated and cannot log in',
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      branch: user.branch,
    };

    const token = jwt.sign(
      { userId: user.id },
      this.configService.get('JWT_SECRET'),
    );
    return { token, user: userData };
  }

  async updatePassword(updatePasswordDto: any): Promise<{ message: string }> {
    const {
      userId,
      currentPassword,
      newPassword,
      name,
      email,
      phone,
      address,
    } = updatePasswordDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (currentPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        phone,
        address,
        password: user.password,
      },
    });

    return { message: 'User data updated successfully' };
  }

  async deleteUser(id: string): Promise<string> {
    await this.prisma.user.delete({ where: { id } });
    return 'Deleted successfully';
  }

  async getUsers(
    role?: UserRole,
    page: number = 1,
    perPage: number = 25,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;
    const totalCountPromise = this.prisma.user.count();

    const where: Prisma.UserWhereInput = role ? { role } : {};

    const dataPromise = this.prisma.user.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        advances: true,
        permissions: true,
      },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
  }

  async getAdmin(email: string): Promise<any> {
    const adminUser = await this.prisma.user.findUnique({
      where: { email, role: 'admin' },
    });
    if (!adminUser) {
      throw new NotFoundException('Admin user not found');
    }
    return adminUser;
  }

  async getVendors(): Promise<any[]> {
    return this.prisma.user.findMany({ where: { role: 'vendor' } });
  }

  async getJWT(email: string): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = jwt.sign({ email }, this.configService.get('JWT_SECRET'), {
        expiresIn: '1h',
      });
      return { accessToken: token };
    }
    throw new NotFoundException('User not found');
  }

  async getUser(id: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { permissions: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: { id },
      include: { permissions: true },
    });

    if (!oldUser) {
      throw new NotFoundException('User not found');
    }

    const { photos, permissions, ...rest } = updateUserDto;

    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];

    const permissionsData = permissions
      ? {
          set: permissions.map((permissionId) => ({ id: permissionId })),
        }
      : undefined;

    const userUpdate = await this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        photos: photoObjects.length > 0 ? photoObjects : undefined,
        permissions: permissionsData,
      },
    });

    await this.auditLogService.log(id, 'User', 'UPDATE', oldUser, userUpdate);
    return { message: 'User updated successfully', userUpdate };
  }

  async getLastVisitedProducts(userId: string): Promise<Product[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastVisited: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const productIds = user.lastVisited;

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        reviews: true,
      },
    });

    return products;
  }

  async updateUserAdmin(id: string, updateUserDto: any): Promise<any> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
}
