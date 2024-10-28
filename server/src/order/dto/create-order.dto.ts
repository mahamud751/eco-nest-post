import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Gender, OrderStatus, CancelStatus } from '@prisma/client';

export class CreateOrderDto {
  @ApiPropertyOptional({
    description: 'State of the order',
    type: [Object],
  })
  @IsArray()
  @IsOptional()
  getState?: any[];

  @ApiProperty({
    description: 'Total price of the order',
    example: '1500',
  })
  @IsOptional()
  @IsString()
  grandPrice: string;

  @ApiProperty({
    description: 'Selected size for the product',
    example: 'M',
    required: false,
  })
  @IsOptional()
  @IsString()
  selectedSize?: string;

  @ApiPropertyOptional({
    description: 'Is the order on b2b?',
    enum: ['yes', 'no'],
  })
  @IsEnum(['yes', 'no'])
  @IsOptional()
  b2b?: string;

  @ApiProperty({
    description: 'Selected color for the product',
    example: 'Red',
    required: false,
  })
  @IsOptional()
  @IsString()
  selectedColor?: string;

  @ApiProperty({
    description: "Customer's first name",
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Customer's last name",
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'User ID associated with the order',
    example: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'john.doe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '+880123456789',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'City for delivery',
    example: 'Dhaka',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: "Customer's  address",
    example: '123 Main St',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: "Customer's street address",
    example: '123 Main St',
  })
  @IsString()
  streetAddress: string;

  @ApiProperty({
    description: 'Country of the customer',
    example: 'Bangladesh',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'District of the customer',
    example: 'Dhaka',
    required: false,
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({
    description: 'Apartment number (if applicable)',
    example: 'A2',
    required: false,
  })
  @IsOptional()
  @IsString()
  apartment?: string;

  @ApiProperty({
    description: 'Postal code for delivery',
    example: '1212',
  })
  @IsString()
  postCode: string;

  @ApiProperty({
    description: "Customer's gender",
    enum: Gender,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'Payment method used',
    example: 'bkash',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentType?: string;

  @ApiProperty({
    description: 'Payment number (e.g., Bkash number)',
    example: '+8801XXXXXXXXX',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentNumber?: string;

  @ApiProperty({
    description: 'Transaction ID for payment',
    example: 'TRX123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiProperty({
    description: 'Nagad number used for payment',
    example: '+8801XXXXXXXXX',
    required: false,
  })
  @IsOptional()
  @IsString()
  nagadNumber?: string;

  @ApiProperty({
    description: 'Bkash number used for payment',
    example: '+8801XXXXXXXXX',
    required: false,
  })
  @IsOptional()
  @IsString()
  bkashNumber?: string;

  @ApiProperty({
    description: 'Bkash transaction ID',
    example: 'BK123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  bkashTrx?: string;

  @ApiProperty({
    description: 'Rocket number used for payment',
    example: '+8801XXXXXXXXX',
    required: false,
  })
  @IsOptional()
  @IsString()
  rocketNumber?: string;

  @ApiProperty({
    description: 'Rocket transaction ID',
    example: 'RC123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  rocketTrx?: string;

  @ApiProperty({
    description: 'Dutch Bangla payment number',
    example: '+8801XXXXXXXXX',
    required: false,
  })
  @IsOptional()
  @IsString()
  dutchNumber?: string;

  @ApiProperty({
    description: 'Dutch Bangla transaction ID',
    example: 'DB123456',
    required: false,
  })
  @IsOptional()
  @IsString()
  dutchTrx?: string;

  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatus,
    default: OrderStatus.pending,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({
    description: 'Total amount of the order',
    example: 1500,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({
    description: 'Amount received for the order',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  receivedTk?: number;

  @ApiProperty({
    description: 'Amount due for the order',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  dueAmount?: number;

  @ApiProperty({
    description: 'Total received amount',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalReceiveTk?: number;

  @ApiProperty({
    description: 'Unreceived amount',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  unReceivedTk?: number;

  @ApiProperty({
    description: 'Payment status (e.g., paid, unpaid)',
    example: 'paid',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({
    description: 'Is the order booking extended',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bookingExtend?: boolean;

  @ApiProperty({
    description: 'Is the order canceled',
    enum: CancelStatus,
    default: CancelStatus.NO,
  })
  @IsOptional()
  @IsEnum(CancelStatus)
  isCancel?: CancelStatus;

  @ApiProperty({
    description: 'Information regarding user cancellation',
    required: false,
    type: 'object',
  })
  @IsOptional()
  userCancel?: any;

  @ApiPropertyOptional({
    description: 'List of rider IDs associated with the order',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  riderIds?: string[];
}
