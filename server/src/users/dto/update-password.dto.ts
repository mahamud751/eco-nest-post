// update-password.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID of the user' })
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Current password of the user', required: false })
  currentPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'New password for the user', required: false })
  newPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Name of the user', required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Email of the user', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Phone number of the user', required: false })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Address of the user', required: false })
  address?: string;
}
