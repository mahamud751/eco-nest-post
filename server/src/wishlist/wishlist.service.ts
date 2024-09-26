import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const { productId, ...rest } = createWishlistDto;

    return this.prisma.wishlist.create({
      data: {
        ...rest,
        productId: productId, // Pass productId directly
      },
    });
  }

  findAll() {
    return this.prisma.wishlist.findMany();
  }

  findOne(id: string) {
    return this.prisma.wishlist.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async update(id: string, updateWishlistDto: UpdateWishlistDto) {
    const { productId, ...rest } = updateWishlistDto;

    return this.prisma.wishlist.update({
      where: { id },
      data: {
        ...rest,
        products: {
          connect: { id: productId },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.wishlist.delete({ where: { id } });
  }
}
