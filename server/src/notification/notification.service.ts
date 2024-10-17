import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, UpdateNotificationStatusDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }


  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { userEmail, message, ...rest } = createNotificationDto;
    const notification = await this.prisma.notification.create({
      data: {
        userEmail,
        message,
        ...rest
      },
    });

    return notification;
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
    email?: string,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;

    const where: any = {
      email: {
        contains: email,
        mode: 'insensitive',
      },
    };

    const totalCountPromise = this.prisma.notification.count({
      where,
    });

    const dataPromise = this.prisma.notification.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
    });
    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);
    return { data, total };
  }

  findOne(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async getNotificationsForUserByEmail(email: string) {
    return this.prisma.notification.findMany({
      where: { userEmail: email },
    });
  }

  async updateNotificationStatus(id: string, updateStatusDto: UpdateNotificationStatusDto) {
    return this.prisma.notification.update({
      where: { id },
      data: { status: updateStatusDto.status },
    });
  }
}
