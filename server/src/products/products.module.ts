import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { AuditLogService } from 'src/audit/audit.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, AuditLogService],
})
export class ProductModule {}
