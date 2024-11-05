import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessagesService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({ namespace: '/chat' })
export class MessagesGateway {
  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageDto) {
    const message = await this.messagesService.createMessage(data);
    return message;
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(@MessageBody() senderId: string, receiverId: string) {
    const messages = await this.messagesService.getMessagesByUser(
      senderId,
      receiverId,
    );
    return messages;
  }
}
