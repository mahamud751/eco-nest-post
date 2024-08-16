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
import { UserStatus } from '@prisma/client';

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
  phone?: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'The role of the user', required: false })
  @IsOptional()
  @IsString()
  role?: string;

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
}
export default CreateUserDto;
