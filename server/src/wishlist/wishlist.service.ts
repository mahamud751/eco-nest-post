import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const { productId, email } = createWishlistDto;

    // Check if the product already exists in the user's wishlist
    const existingWishlist = await this.prisma.wishlist.findFirst({
      where: {
        email: email, // Check for the specific user by email
        productId: productId, // Check if the product is already in the wishlist
      },
    });

    // If the product already exists in the wishlist, throw an error
    if (existingWishlist) {
      throw new Error('Product already exists in your wishlist.');
    }

    // If the product is not in the wishlist, create a new wishlist entry
    return this.prisma.wishlist.create({
      data: {
        email,
        userName: createWishlistDto.userName,
        productId, // Directly pass productId
      },
    });
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;
    const totalCountPromise = this.prisma.wishlist.count();

    const dataPromise = this.prisma.wishlist.findMany({
      skip,
      take: perPageNumber,
      orderBy: { createdAt: 'desc' },
      include: {
        products: true,
      },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
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
