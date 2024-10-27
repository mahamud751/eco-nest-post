import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuditLogService } from '../audit/audit.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const { users, ...rest } = createPermissionDto;

    try {
      const permission = await this.prisma.permission.create({
        data: {
          ...rest,
          users: {
            connect: users?.map((userId) => ({ id: userId })),
          },
        },
        include: {
          users: true,
        },
      });

      return { message: 'Permission created successfully', permission };
    } catch (error) {
      console.error('Error creating permission:', error);
      throw new InternalServerErrorException('Failed to create permission');
    }
  }

  async findAll(
    page: number = 1,
    perPage: number = 100,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 100;

    const skip = (pageNumber - 1) * perPageNumber;

    const totalCountPromise = this.prisma.permission.count();

    const dataPromise = this.prisma.permission.findMany({
      skip,
      take: perPageNumber,
      orderBy: { createdAt: 'desc' },
      include: {
        users: true,
      },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('permission not found');
    }
    return permission;
  }

  async update(id: string, UpdatePermissionDto: UpdatePermissionDto) {
    const oldPermission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!oldPermission) {
      throw new NotFoundException('permission not found');
    }
    const { ...rest } = UpdatePermissionDto;

    const bannerUpdate = await this.prisma.permission.update({
      where: { id },
      data: {
        ...rest,
      },
    });

    await this.auditLogService.log(
      id,
      'permission',
      'UPDATE',
      oldPermission,
      bannerUpdate,
    );
    return { message: 'permission updated successfully', bannerUpdate };
  }

  async remove(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('permission not found');
    }

    return this.prisma.permission.delete({ where: { id } });
  }
}
