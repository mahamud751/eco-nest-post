import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path according to your project structure
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client'; // Import Product type from Prisma client
import { AuditLogService } from 'src/audit/audit.service';
import { PaginatedResult } from './type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const { categoryId, subcategoryId, branchId, reviewId, userInfo, ...rest } =
      createProductDto;

    // userInfo is already an object due to the DTO configuration
    let parsedUserInfo = userInfo || null;

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const subcategory = subcategoryId
      ? await this.prisma.subCategory.findUnique({
          where: { id: subcategoryId },
        })
      : null;
    if (subcategoryId && !subcategory)
      throw new NotFoundException('SubCategory not found');

    const branch = branchId
      ? await this.prisma.branch.findUnique({ where: { id: branchId } })
      : null;
    if (branchId && !branch) throw new NotFoundException('Branch not found');

    const review = reviewId
      ? await this.prisma.review.findUnique({ where: { id: reviewId } })
      : null;
    if (reviewId && !review) throw new NotFoundException('Review not found');

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        userInfo: parsedUserInfo, // Store userInfo directly as an object
        category: { connect: { id: categoryId } },
        subcategory: subcategoryId
          ? { connect: { id: subcategoryId } }
          : undefined,
        branch: branchId ? { connect: { id: branchId } } : undefined,
        review: reviewId ? { connect: { id: reviewId } } : undefined,
      },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    return {
      message: 'Product created successfully',
      product,
    };
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
    limit?: number,
    flashsale?: string,
  ): Promise<PaginatedResult<Product>> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * perPageNumber;
    const take = limitNumber || perPageNumber;

    const where: any = {};
    if (flashsale) {
      where.flashsale = flashsale;
    }

    const totalCountPromise = this.prisma.product.count({ where });

    const dataPromise = this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
  }

  async findPopular(
    page: number = 1,
    perPage: number = 10,
  ): Promise<PaginatedResult<Product>> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Math.min(Number(perPage) || 10, 15);
    const skip = (pageNumber - 1) * perPageNumber;

    const fixedTotalCount = 15;

    const dataPromise = this.prisma.product.findMany({
      skip,
      take: perPageNumber,
      orderBy: { views: 'desc' },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    const data = await dataPromise;

    return { data, total: fixedTotalCount };
  }

  async findLatest(
    page: number = 1,
    perPage: number = 10,
  ): Promise<PaginatedResult<Product>> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Math.min(Number(perPage) || 10, 15);
    const skip = (pageNumber - 1) * perPageNumber;

    // Fixed total count for pagination, not the actual count of products
    const fixedTotalCount = 15;

    // Fetch the latest products with pagination
    const dataPromise = this.prisma.product.findMany({
      skip,
      take: perPageNumber,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    const data = await dataPromise;

    return { data, total: fixedTotalCount };
  }

  async findRecentlyVisited(
    userId: string,
    page: number = 1,
    perPage: number = 10,
  ): Promise<PaginatedResult<Product>> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Math.min(Number(perPage) || 10, 20);
    const skip = (pageNumber - 1) * perPageNumber;

    const where: any = {};
    if (userId) {
      where.userId = userId;
    }

    const totalCountPromise = this.prisma.product.count({
      where,
    });

    const dataPromise = this.prisma.product.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
  }

  async findOne(id: string, userId?: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        subcategory: true,
        branch: true,
        review: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Update views
    await this.prisma.product.update({
      where: { id },
      data: { views: { increment: 1 }, updatedAt: new Date() },
    });

    // If userId is provided, log the last visit
    if (userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Ensure lastVisited is an array if not already
      const updatedLastVisited = user.lastVisited || [];

      // Add the product ID if it doesn't already exist
      if (!updatedLastVisited.includes(id)) {
        updatedLastVisited.push(id);
      }

      // Update the user with the new lastVisited array
      await this.prisma.user.update({
        where: { id: userId },
        data: { lastVisited: updatedLastVisited },
      });
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; productUpdate: Product }> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { categoryId, subcategoryId, branchId, reviewId, ...rest } =
      updateProductDto;

    const productUpdate = await this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        subcategory: subcategoryId
          ? { connect: { id: subcategoryId } }
          : undefined,
        branch: branchId ? { connect: { id: branchId } } : undefined,
        review: reviewId ? { connect: { id: reviewId } } : undefined,
      },
    });
    await this.auditLogService.log(
      id,
      'Product',
      'UPDATE',
      product,
      productUpdate,
    );
    return { message: 'Product updated successfully', productUpdate };
  }

  async remove(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({ where: { id } });

    return product;
  }

  async updateStatuses(): Promise<void> {
    await this.prisma.product.updateMany({
      where: { status: 'Active' },
      data: { status: 'active' },
    });
    await this.prisma.product.updateMany({
      where: { status: 'InActive' },
      data: { status: 'inactive' },
    });

    console.log('Statuses updated successfully');
  }
}
