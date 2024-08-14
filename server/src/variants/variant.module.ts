import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';

@Module({
  controllers: [VariantController],
  providers: [VariantService, PrismaService],
})
export class VariantModule {}
