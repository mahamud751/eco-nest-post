import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterProductDto } from './dto/fIlter-product.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.categoryService.findAll(page, perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiParam({ name: 'id', description: 'ID of the category to retrieve' })
  @ApiQuery({
    name: 'subcategory',
    required: false,
    description: 'Subcategory ID to filter',
  })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id') id: string, @Query('subcategory') subcategory?: string) {
    return this.categoryService.findOne(id, subcategory);
  }

  @Get(':id/products')
  @ApiOperation({
    summary: 'Get products in a category with pagination and filters',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the category to retrieve products for',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({
    name: 'perPage',
    required: false,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'priceRange',
    required: false,
    description: 'Price range filter',
  })
  @ApiQuery({ name: 'sizes', required: false, description: 'Size filter' })
  @ApiQuery({ name: 'colors', required: false, description: 'Color filter' })
  @ApiQuery({
    name: 'sortPrice',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sort by price',
  })
  async getCategoryProducts(
    @Param('id') id: string,
    @Query() filterProductDto: FilterProductDto,
  ) {
    return this.categoryService.findOneWithProducts(id, filterProductDto);
  }

  @Get(':id/user')
  @ApiOperation({ summary: 'Get a category for user by id' })
  @ApiParam({ name: 'id', description: 'ID of the category to retrieve' })
  @ApiQuery({
    name: 'subcategory',
    required: false,
    description: 'Subcategory ID to filter',
  })
  @ApiResponse({ status: 200, description: 'Return the category for user.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOneForUser(
    @Param('id') id: string,
    @Query('subcategory') subcategory?: string,
  ) {
    return this.categoryService.findOneForUser(id, subcategory);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', description: 'ID of the category to update' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', description: 'ID of the category to delete' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
