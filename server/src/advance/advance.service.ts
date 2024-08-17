import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdvanceDto } from './dto/create-advance.dto';
import { UpdateAdvanceDto } from './dto/update-advance.dto';
import { AuditLogService } from '../audit/audit.service';
import * as crypto from 'crypto';

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
      files, // Extract files here
    } = createAdvanceDto;

    // Validate files if necessary
    if (files) {
      files.forEach((file) => {
        if (!file.title || !file.src) {
          throw new ConflictException('File must have title and src.');
        }
      });
    }

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
        files: files
          ? {
              create: files.map((file) => ({
                title: file.title,
                src: file.src,
                srcHash: crypto
                  .createHash('md5')
                  .update(file.src)
                  .digest('hex'), // Hashing the src
              })),
            }
          : undefined,
      },
      include: {
        files: true,
      },
    });

    return { message: 'Advance product created successfully', advance };
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;

    const skip = (pageNumber - 1) * perPageNumber;

    const totalCountPromise = this.prisma.advance.count();

    const dataPromise = this.prisma.advance.findMany({
      skip,
      take: perPageNumber,
      orderBy: { createdAt: 'desc' },
      include: {
        files: true,
      },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
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
      include: { files: true },
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    const { files, ...updateData } = updateAdvanceDto;

    // Determine which files should be removed
    const filesToRemove = advance.files.filter(
      (file) => !files?.some((f) => f.id === file.id),
    );

    // Handle file upserts
    const fileUpserts = (files || []).map((file) => {
      const srcHash = file.src
        ? crypto.createHash('md5').update(file.src).digest('hex')
        : undefined;

      // Check if the srcHash already exists for another file
      const existingFile = advance.files.find(
        (f) => f.srcHash === srcHash && f.id !== file.id,
      );

      if (existingFile) {
        return {
          where: {
            id: existingFile.id, // Update existing file
          },
          update: {
            title: file.title,
            src: file.src,
            srcHash,
          },
          create: {
            title: file.title,
            src: file.src,
            srcHash,
          },
        };
      }

      // If no existing file with the same srcHash, create new
      return {
        where: {
          id: file.id || undefined, // Use id if available
          srcHash: srcHash || undefined, // Use srcHash if available
        },
        update: {
          title: file.title,
          src: file.src,
          srcHash,
        },
        create: {
          title: file.title,
          src: file.src,
          srcHash,
        },
      };
    });

    // Perform the update
    const updatedAdvance = await this.prisma.advance.update({
      where: { id },
      data: {
        ...updateData,
        files: {
          deleteMany: filesToRemove.map((file) => ({ id: file.id })),
          upsert: fileUpserts,
        },
      },
      include: { files: true },
    });

    // Handle file system operations if needed
    // You might want to manually handle file system updates here

    await this.auditLogService.log(
      id,
      'Advance',
      'UPDATE',
      advance,
      updatedAdvance,
    );
    return { message: 'Advance Order updated successfully', updatedAdvance };
  }

  async remove(id: string) {
    const advance = await this.prisma.advance.findUnique({
      where: { id },
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    // Remove associated files before deleting the advance
    await this.prisma.file.deleteMany({
      where: { advanceId: id },
    });

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
      include: { demo: true },
    });

    if (!advance) {
      throw new NotFoundException('Advance product not found');
    }

    const demo = advance.demo.find((demo) => demo.id === demoId);
    if (!demo) {
      throw new NotFoundException('Demo not found');
    }

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
