import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuditLogService } from 'src/audit/audit.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, AuditLogService],
})
export class CategoryModule {}
