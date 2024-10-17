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
