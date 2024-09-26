import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  create(createWishlistDto: CreateWishlistDto) {
    return this.prisma.wishlist.create({
      data: createWishlistDto,
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

  update(id: string, updateWishlistDto: UpdateWishlistDto) {
    return this.prisma.wishlist.update({
      where: { id },
      data: updateWishlistDto,
    });
  }

  remove(id: string) {
    return this.prisma.wishlist.delete({ where: { id } });
  }
}
