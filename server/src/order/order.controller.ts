import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginatedResult } from 'src/products/type';

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
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('email') email?: string,
  ) {
    return this.orderService.findAll(page, perPage, email);
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

  @Put('/:id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'The updated order details' })
  updateOrder(@Param('id') id: string, @Body() updateData: any) {
    return this.orderService.updateOrder(id, updateData);
  }
}
