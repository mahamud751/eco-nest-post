import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationGateway } from './notification.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
