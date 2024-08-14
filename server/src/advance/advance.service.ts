import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { AuditLogService } from '../audit/audit.service';

@Injectable()
export class AdvanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(createAdvanceDto: CreateAdvanceDto) {
    const {
      name,
      number,
      email,
      students,
      ratio,
      topPart,
      topFab,
      bottomPart,
      bottomFab,
      address,
      quantity,
      files,
    } = createAdvanceDto;

    // Convert details to Prisma compatible format if needed
    const advance = await this.prisma.advance.create({
      data: {
        name,
        number,
        email,
        students,
        ratio,
        topPart,
        topFab,
        bottomPart,
        bottomFab,
        address,
        quantity,
        files: {
          create: files?.map((detail) => ({
            title: detail.title,
            src: detail.src,
          })),
        },
      },
      include: {
        files: true, // Ensure related files are included in the response
      },
    });

    return { message: 'Advance product created successfully', advance };
  }

  async findAll() {
    return this.prisma.advance.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        files: true,
      },
    });
  }

  async findOne(id: string) {
    const advance = await this.prisma.advance.findUnique({
      where: { id },
      include: {
        files: true,
      },
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    return advance;
  }

  async update(id: string, updateAdvanceDto: UpdateAdvanceDto) {
    const advance = await this.prisma.advance.findUnique({
      where: { id },
      include: {
        files: true, // Ensure related files are included
      },
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    const { files, fileId, ...updateData } = updateAdvanceDto;

    // Prepare file update operations
    const updatePayload: any = {
      ...updateData,
      ...(fileId && {
        files: {
          connect: { id: fileId },
        },
      }),
    };

    // Update the advance product with files handling
    const updatedAdvance = await this.prisma.advance.update({
      where: { id },
      data: {
        ...updatePayload,
        files:
          files?.length > 0
            ? {
                upsert: files.map((file) => ({
                  where: { src: file.src }, // Assumes `src` is unique
                  update: { title: file.title },
                  create: file,
                })),
              }
            : undefined,
      },
    });

    await this.auditLogService.log(
      id,
      'AdvanceProduct',
      'UPDATE',
      advance,
      updatedAdvance,
    );

    return { message: 'Advance updated successfully', updatedAdvance };
  }

  async remove(id: string) {
    const advance = await this.prisma.advance.findUnique({
      where: { id },
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    await this.prisma.advance.delete({
      where: { id },
    });

    return { message: 'Advance product deleted successfully' };
  }

  async findByVendorId(vendorId: string) {
    return this.prisma.advance.findMany({
      where: { vendors: { some: { id: vendorId } } },
    });
  }

  async updateDemoStatus(id: string, demoId: string, isDemoPublished: boolean) {
    const advance = await this.prisma.advance.findUnique({
      where: { id },
      include: { demo: true }, // Make sure to include related demos
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    const demo = advance.demo.find((demo) => demo.id === demoId);
    if (!demo) {
      throw new NotFoundException('Demo not found');
    }

    // Update demo status
    const updatedAdvance = await this.prisma.advance.update({
      where: { id },
      data: {
        demo: {
          update: {
            where: { id: demoId },
            data: { isDemoPublished },
          },
        },
      },
    });

    return updatedAdvance;
  }
}
