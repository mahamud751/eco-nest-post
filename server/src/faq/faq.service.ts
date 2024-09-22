import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    const { title, desc, position } = createFaqDto;

    const faq = await this.prisma.faq.create({
      data: {
        title,
        desc,
        position,
      },
    });
    return { message: 'Faq comment created successfully', faq };
  }

  async findAll() {
    return this.prisma.faq.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const faq = await this.prisma.faq.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException('Faq comment not found');
    }

    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const faq = await this.prisma.faq.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException('Faq comment not found');
    }

    const updatedFaqComment = await this.prisma.faq.update({
      where: { id },
      data: updateFaqDto,
    });

    return {
      message: 'Faq comment updated successfully',
      updatedFaqComment,
    };
  }

  async remove(id: string) {
    const faq = await this.prisma.faq.findUnique({
      where: { id },
    });

    if (!faq) {
      throw new NotFoundException('Faq not found');
    }

    await this.prisma.faq.delete({
      where: { id },
    });

    return { message: 'Faq deleted successfully' };
  }
}
