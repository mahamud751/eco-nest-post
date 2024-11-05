// src/messages/messages.module.ts
import { Module } from '@nestjs/common';
import { MessagesGateway } from './message.getway';
import { MessagesService } from './message.service';

@Module({
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
