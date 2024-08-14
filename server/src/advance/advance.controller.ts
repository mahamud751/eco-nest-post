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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AdvanceService } from './advance.service';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../middleware/multer.config'; // Ensure this matches the export from multer.config.ts

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
    console.log('Uploaded file:', file);
    if (file) {
      createAdvanceDto.files = [{ title: file.originalname, src: file.path }];
    }
    return this.advanceService.create(createAdvanceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all advance products' })
  @ApiResponse({ status: 200, description: 'Return all advance products' })
  @ApiResponse({ status: 404, description: 'No advance products found' })
  findAll() {
    return this.advanceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an advance product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the advance product' })
  @ApiResponse({ status: 200, description: 'Return an advance product by ID' })
  @ApiResponse({ status: 404, description: 'Advance product not found' })
  findOne(@Param('id') id: string) {
    return this.advanceService.findOne(id);
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
  update(@Param('id') id: string, @Body() updateAdvanceDto: UpdateAdvanceDto) {
    return this.advanceService.update(id, updateAdvanceDto);
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
