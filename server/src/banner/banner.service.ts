import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { AuditLogService } from '../audit/audit.service';

@Injectable()
export class BannerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const { photos, ...rest } = createBannerDto;
    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];
    const banner = await this.prisma.banner.create({
      data: {
        ...rest,
        photos: photoObjects,
      },
    });
    return { message: 'Banner created successfully', banner };
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;

    const skip = (pageNumber - 1) * perPageNumber;

    const totalCountPromise = this.prisma.banner.count();

    const dataPromise = this.prisma.banner.findMany({
      skip,
      take: perPageNumber,
      orderBy: { createdAt: 'desc' },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    const oldBanner = await this.prisma.banner.findUnique({ where: { id } });

    if (!oldBanner) {
      throw new NotFoundException('Banner not found');
    }
    const { photos, ...rest } = updateBannerDto;

    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];
    const bannerUpdate = await this.prisma.banner.update({
      where: { id },
      data: {
        ...rest,
        photos: photoObjects.length > 0 ? photoObjects : undefined,
      },
    });

    await this.auditLogService.log(
      id,
      'Banner',
      'UPDATE',
      oldBanner,
      bannerUpdate,
    );
    return { message: 'Banner updated successfully', bannerUpdate };
  }

  async remove(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    return this.prisma.banner.delete({ where: { id } });
  }
}
