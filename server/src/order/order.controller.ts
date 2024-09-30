import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders' })
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get('/totalGrandPrice')
  @ApiOperation({ summary: 'Get total grand price of all orders' })
  @ApiResponse({ status: 200, description: 'Total grand price' })
  getTotalGrandPrice() {
    return this.orderService.calculateTotalGrandPrice();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'The order details' })
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Get('/myBooking')
  @ApiOperation({ summary: 'Get orders by email' })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email address of the user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of orders associated with the user email',
  })
  getOrdersByEmail(@Query('email') email: string) {
    return this.orderService.getOrdersByEmail(email);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'The updated order details' })
  updateOrder(@Param('id') id: string, @Body() updateData: any) {
    return this.orderService.updateOrder(id, updateData);
  }
}
