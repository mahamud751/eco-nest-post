import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { AuditLogService } from 'src/audit/audit.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    AuditLogService,
    NotificationService,
  ],
})
export class OrderModule {}
