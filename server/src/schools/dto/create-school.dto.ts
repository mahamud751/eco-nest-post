import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PhotoDto } from 'src/dto/photoDto';
import { SchoolStatus } from '@prisma/client';

export class CreateSchoolDto {
  @ApiProperty({ description: 'The name of the school' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Array of photo objects',
    type: [PhotoDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoDto)
  @IsOptional()
  photos?: PhotoDto[];

  @ApiProperty({ description: 'The email of the school', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The password for school login',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'The location of the school', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'List of students',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  students?: string[];

  @ApiProperty({
    description: 'The status of the school',
    enum: SchoolStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(SchoolStatus)
  status?: SchoolStatus;
}

export default CreateSchoolDto;
