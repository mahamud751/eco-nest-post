import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class FileDetailDto {
  @ApiProperty({
    example: 'file-title',
    description: 'The title of the uploaded file',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/path/to/file',
    description: 'The source URL of the file',
  })
  @IsString()
  @IsNotEmpty()
  src: string;
}
