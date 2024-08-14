import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuditLogService } from 'src/audit/audit.service';

@Injectable()
export class BlogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const { name, desc, photos } = createBlogDto;

    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];

    const blog = await this.prisma.blog.create({
      data: {
        name,
        desc,
        photos: photoObjects,
      },
    });

    return { message: 'Blog created successfully', blog };
  }

  async findAll() {
    return this.prisma.blog.findMany({
      include: {
        blogComments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        blogComments: true,
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const { photos, ...rest } = updateBlogDto;

    const photoObjects =
      photos?.map((photo) => ({
        title: photo.title,
        src: photo.src,
      })) || [];

    const updatedBlog = await this.prisma.blog.update({
      where: { id },
      data: {
        ...rest,
        photos: photoObjects.length > 0 ? photoObjects : undefined,
      },
    });

    await this.auditLogService.log(id, 'Blog', 'UPDATE', blog, updatedBlog);

    return { message: 'Blog updated successfully', updatedBlog };
  }

  async remove(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    await this.prisma.blog.delete({
      where: { id },
    });

    return { message: 'Blog deleted successfully' };
  }
}
