import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateFaqDto {
  @ApiPropertyOptional({ description: 'Name of the faq' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Email of the faq' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiPropertyOptional({ description: 'Position of the faq' })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional({
    description: 'The status of the faq',
    enum: ['active', 'inActive'],
  })
  @IsEnum(['active', 'inActive'])
  @IsOptional()
  status?: string;
}
