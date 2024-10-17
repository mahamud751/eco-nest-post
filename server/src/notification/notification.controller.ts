import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNotificationDto, UpdateNotificationStatusDto } from './dto/create-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }



  @Get('user/:email')
  @ApiOperation({ summary: 'Get all notifications for a specific user by email' })
  @ApiResponse({ status: 200, description: 'List of notifications for the user by email.' })
  async getNotificationsByEmail(@Param('email') email: string) {
    return this.notificationService.getNotificationsForUserByEmail(email);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update notification status (read/unread)' })
  @ApiResponse({ status: 200, description: 'Notification status successfully updated.' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateNotificationStatusDto,
  ) {
    return this.notificationService.updateNotificationStatus(id, updateStatusDto);
  }
}
