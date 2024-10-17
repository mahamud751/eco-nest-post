import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, UpdateNotificationStatusDto } from './dto/create-notification.dto';


@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
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
