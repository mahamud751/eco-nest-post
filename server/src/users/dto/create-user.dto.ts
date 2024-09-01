import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PhotoDto } from 'src/dto/photoDto';
import { Type } from 'class-transformer';
import { UserRole, UserStatus } from '@prisma/client';
import { IsBangladeshPhoneNumber } from './phone-number-validation';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the user', required: false })
  @IsString()
  address: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the user', required: false })
  @IsOptional()
  @IsString()
  @IsBangladeshPhoneNumber({ message: 'Invalid Bangladesh phone number.' })
  phone?: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Array of photo objects',
    type: [PhotoDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoDto)
  @IsOptional()
  photos?: PhotoDto[];

  @ApiProperty({ description: 'The branch of the user', required: false })
  @IsString()
  @IsOptional()
  branch?: string;

  @ApiProperty({
    description: 'The status of the user',
    enum: UserStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({
    description: 'Array of advance IDs associated with the advance',
    type: [String],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  advances?: string[];
}
