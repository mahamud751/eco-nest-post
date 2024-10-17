import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateNotificationDto, UpdateNotificationStatusDto } from './dto/create-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }


  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification successfully created.' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({ status: 200, description: 'Return all subcategories.' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('email') email?: string,
  ) {
    return this.notificationService.findAll(page, perPage, email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wishlist by id' })
  @ApiParam({ name: 'id', description: 'ID of the wishlist to retrieve' })
  @ApiResponse({ status: 200, description: 'Return the wishlist.' })
  @ApiResponse({ status: 404, description: 'Wishlist not found.' })
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(id);
  }

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
