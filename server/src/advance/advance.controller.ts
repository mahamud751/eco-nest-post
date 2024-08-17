import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdvanceService } from './advance.service';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { multerOptions } from '../../middleware/multer.config';

@ApiTags('Advance Products')
@Controller('advance')
export class AdvanceController {
  constructor(private readonly advanceService: AdvanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new advance product' })
  @ApiBody({ type: CreateAdvanceDto })
  @ApiResponse({
    status: 201,
    description: 'The advance product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Body() createAdvanceDto: CreateAdvanceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createAdvanceDto.files = [
        {
          title: file.originalname,
          src: `/uploads/${file.filename}`,
          srcHash: '', // This will be set in the service
          id: undefined,
        },
      ];
    }

    if (createAdvanceDto.files) {
      for (const fileDetail of createAdvanceDto.files) {
        if (fileDetail.src.startsWith('data:')) {
          const matches = fileDetail.src.match(/^data:(.+);base64,(.+)$/);
          if (!matches) {
            throw new BadRequestException('Invalid Base64 string');
          }

          const fileType = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `${uuidv4()}.${fileType.split('/')[1]}`;
          const filePath = join('public', 'uploads', filename);

          await writeFile(filePath, buffer);
          fileDetail.src = `/${filename}`;
        }
      }
    }

    return this.advanceService.create(createAdvanceDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an advance product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the advance product' })
  @ApiBody({ type: UpdateAdvanceDto })
  @ApiResponse({
    status: 200,
    description: 'The advance product has been successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Advance product not found' })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateAdvanceDto: UpdateAdvanceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Handle Multer file upload
    if (file) {
      updateAdvanceDto.files = [
        {
          title: file.originalname,
          src: `/uploads/${file.filename}`,
          srcHash: '', // This will be set in the service
          id: undefined,
        },
      ];
    }

    // Handle Base64 file uploads if provided
    if (updateAdvanceDto.files) {
      for (const fileDetail of updateAdvanceDto.files) {
        if (fileDetail.src.startsWith('data:')) {
          const matches = fileDetail.src.match(/^data:(.+);base64,(.+)$/);
          if (!matches) {
            throw new BadRequestException('Invalid Base64 string');
          }

          const fileType = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `${uuidv4()}.${fileType.split('/')[1]}`;
          const filePath = join('public', 'uploads', filename);

          await writeFile(filePath, buffer);
          fileDetail.src = `/${filename}`; // Update the path to reflect the public URL
        }
      }
    }

    return this.advanceService.update(id, updateAdvanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all advance products' })
  @ApiResponse({ status: 200, description: 'Return all advance products' })
  @ApiResponse({ status: 404, description: 'No advance products found' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 25,
  ) {
    return this.advanceService.findAll(page, perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an advance product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the advance product' })
  @ApiResponse({ status: 200, description: 'Return an advance product by ID' })
  @ApiResponse({ status: 404, description: 'Advance product not found' })
  findOne(@Param('id') id: string) {
    return this.advanceService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an advance product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the advance product to delete' })
  @ApiResponse({
    status: 200,
    description: 'The advance product has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Advance product not found' })
  remove(@Param('id') id: string) {
    return this.advanceService.remove(id);
  }

  @Get('/vendor/:vendorId')
  @ApiOperation({ summary: 'Get advance products for a specific vendor' })
  @ApiParam({ name: 'vendorId', description: 'ID of the vendor' })
  @ApiResponse({
    status: 200,
    description: 'Return advance products for the vendor',
  })
  @ApiResponse({
    status: 404,
    description: 'Vendor or advance products not found',
  })
  findByVendorId(@Param('vendorId') vendorId: string) {
    return this.advanceService.findByVendorId(vendorId);
  }

  @Patch(':id/updateIsDemoPublished')
  @ApiOperation({
    summary:
      'Update the isDemoPublished status of a demo within an advance product',
  })
  @ApiParam({ name: 'id', description: 'ID of the advance product' })
  @ApiBody({
    description: 'Payload containing demoId and isDemoPublished status',
  })
  @ApiResponse({
    status: 200,
    description: 'The advance product has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Advance product or demo not found',
  })
  updateDemoStatus(
    @Param('id') id: string,
    @Body() body: { demoId: string; isDemoPublished: boolean },
  ) {
    const { demoId, isDemoPublished } = body;
    return this.advanceService.updateDemoStatus(id, demoId, isDemoPublished);
  }
}
