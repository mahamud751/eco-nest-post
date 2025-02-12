import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Roles from '../auth/roles.decorator';
import RolesGuard from '../auth/roles.guard';
import { Product, UserRole } from '@prisma/client';
import { AdminRoleGuard } from 'src/auth/AdminRoleGuard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
// @UseGuards(RolesGuard)
// @ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Post('login/admin')
  @ApiOperation({ summary: 'Login a admin' })
  @ApiResponse({ status: 200, description: 'admin logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async loginAdmin(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginAdmin(loginUserDto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  async getUsers(
    @Query('role') role?: UserRole,
    @Query('email') email?: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.usersService.getUsers(role, email, page, perPage);
  }

  @Get('admin')
  @Roles('admin')
  @ApiOperation({ summary: 'Get admin user by email' })
  @ApiResponse({
    status: 200,
    description: 'Admin user retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Admin user not found.' })
  async getAdmin(@Query('email') email: string) {
    return this.usersService.getAdmin(email);
  }

  @Get('vendors')
  @ApiOperation({ summary: 'Get all vendor users' })
  @ApiResponse({ status: 200, description: 'Vendors retrieved successfully.' })
  async getVendors() {
    return this.usersService.getVendors();
  }

  @Get('token')
  @ApiOperation({ summary: 'Get JWT token for a user' })
  @ApiResponse({ status: 200, description: 'Token generated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getJWT(@Query('email') email: string) {
    return this.usersService.getJWT(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch('batch-update')
  @ApiOperation({ summary: 'Batch update multiple users' })
  async batchUpdateUsers(
    @Body() body: { ids: string[]; updateUserDto: UpdateUserDto },
  ) {
    const { ids, updateUserDto } = body;
    return this.usersService.batchUpdateUsers(ids, updateUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Patch(':id/update-role')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserRole(id, updateUserDto);
  }

  @Get(':userId/last-visit')
  async getLastVisitedProducts(
    @Param('userId') userId: string,
  ): Promise<Product[]> {
    return this.usersService.getLastVisitedProducts(userId);
  }

  @Put('admin/:id')
  @ApiOperation({ summary: 'Update admin user details' })
  @ApiResponse({ status: 200, description: 'Admin user updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUserAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserAdmin(id, updateUserDto);
  }
}
