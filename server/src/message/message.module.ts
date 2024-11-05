// src/messages/messages.module.ts
import { Module } from '@nestjs/common';
import { MessagesGateway } from './message.getway';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesGateway, PrismaService, MessagesService],
})
export class MessagesModule {}
