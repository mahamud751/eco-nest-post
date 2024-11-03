import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { AuditLogService } from 'src/audit/audit.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BannerController],
  providers: [BannerService, PrismaService, AuditLogService],
})
export class BannerModule {}
