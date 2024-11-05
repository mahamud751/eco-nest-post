import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateNotificationDto,
  UpdateNotificationStatusDto,
} from './dto/create-notification.dto';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => NotificationGateway))
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { userEmail, message, ...rest } = createNotificationDto;
    const notification = await this.prisma.notification.create({
      data: {
        userEmail,
        message,
        ...rest,
      },
    });

    this.notificationGateway.emitNotification(notification);

    return notification;
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
    email?: string,
    status?: string,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = perPage ? Number(perPage) : null;
    const skip = (pageNumber - 1) * (perPageNumber || 0);

    const where: any = {
      userEmail: {
        contains: email,
        mode: 'insensitive',
      },
    };

    if (status) {
      where.status = status;
    }

    const totalCountPromise = this.prisma.notification.count({
      where,
    });

    const dataPromise = this.prisma.notification.findMany({
      skip: perPageNumber ? skip : undefined,
      take: perPageNumber || undefined,
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

  async updateNotificationStatus(
    id: string,
    updateStatusDto: UpdateNotificationStatusDto,
  ) {
    return this.prisma.notification.update({
      where: { id },
      data: { status: updateStatusDto.status },
    });
  }

  async remove(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.delete({ where: { id } });
  }
}
