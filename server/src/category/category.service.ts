import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuditLogService } from 'src/audit/audit.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { photos, ...rest } = createCategoryDto;

    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];

    const category = await this.prisma.category.create({
      data: {
        ...rest,
        photos: photoObjects,
      },
    });
    return { message: 'Category created successfully', category };
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        subCategories: true,
        products: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, subcategory?: string) {
    const includeSubcategory = subcategory ? true : false;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: includeSubcategory,
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findOneForUser(id: string, subcategory?: string) {
    const includeSubcategory = subcategory ? true : false;

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: includeSubcategory,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const { photos, subCategories, products, ...rest } = updateCategoryDto;

    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];

    const categoryUpdate = await this.prisma.category.update({
      where: { id },
      data: {
        ...rest,
        photos: photoObjects.length > 0 ? photoObjects : undefined,
        subCategories: subCategories
          ? {
              set: subCategories.map((subCatId) => ({ id: subCatId })),
            }
          : undefined,
        products: products
          ? {
              set: products.map((productId) => ({ id: productId })),
            }
          : undefined,
      },
    });

    await this.auditLogService.log(
      id,
      'Category',
      'UPDATE',
      category,
      categoryUpdate,
    );

    return { message: 'Category updated successfully', categoryUpdate };
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.subCategory.deleteMany({
      where: { categoryId: id },
    });

    return this.prisma.category.delete({ where: { id } });
  }
}
