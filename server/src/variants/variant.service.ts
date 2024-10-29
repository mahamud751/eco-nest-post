import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVariantDto: CreateVariantDto) {
    const { ...rest } = createVariantDto;

    try {
      const variant = await this.prisma.variant.create({
        data: {
          ...rest,
        },
      });

      return { message: 'Variant created successfully', variant };
    } catch (error) {
      console.error('Error creating Variant:', error);
      throw new InternalServerErrorException('Failed to create Variant');
    }
  }

  async findAll() {
    return this.prisma.variant.findMany();
  }

  async findOne(id: string) {
    const variant = await this.prisma.variant.findUnique({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return variant;
  }

  async update(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = await this.prisma.variant.findUnique({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return this.prisma.variant.update({
      where: { id },
      data: updateVariantDto,
    });
  }

  async remove(id: string) {
    const variant = await this.prisma.variant.findUnique({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return this.prisma.variant.delete({
      where: { id },
    });
  }
}
