import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const { products, ...rest } = createWishlistDto;

    const productData: Prisma.ProductCreateNestedManyWithoutWishlistInput = {
      connect: products?.map((productId) => ({
        id: productId,
      })),
    };

    return this.prisma.wishlist.create({
      data: {
        ...rest,
        products: productData,
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
    const { products, ...rest } = updateWishlistDto;

    const productData: Prisma.ProductUpdateManyWithoutWishlistNestedInput = {
      connect: products?.map((productId) => ({
        id: productId,
      })),
    };

    return this.prisma.wishlist.update({
      where: { id },
      data: {
        ...rest,
        products: productData,
      },
    });
  }

  remove(id: string) {
    return this.prisma.wishlist.delete({ where: { id } });
  }
}
