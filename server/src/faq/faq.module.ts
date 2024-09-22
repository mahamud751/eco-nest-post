import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';

@Module({
  imports: [],
  controllers: [FaqController],
  providers: [FaqService, PrismaService],
})
export class FaqModule {}
