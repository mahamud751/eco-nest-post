import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { VendorStatus } from '@prisma/client'; // Import the enum from Prisma client

export class UpdateVendorDto {
  @ApiPropertyOptional({ description: 'Name of the vendor' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Contact number of the vendor' })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({ description: 'Email of the vendor' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Address of the vendor' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'Status of the vendor',
    enum: ['Pending', 'Processing', 'Approved', 'Canceled'],
  })
  @IsEnum(VendorStatus)
  @IsOptional()
  status?: VendorStatus;
}
