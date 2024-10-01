import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import * as nodemailer from 'nodemailer';
import { UserInfoDto } from 'src/products/dto/user-info.dts';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { ...createOrderDto },
    });

    await this.sendOrderEmail(createOrderDto.email);

    return order;
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
    email?: string,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;

    const skip = (pageNumber - 1) * perPageNumber;

    const totalCountPromise = this.prisma.order.count();

    const where: any = {}; // Define additional filters if necessary

    const dataPromise = this.prisma.order.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    // Filter products based on userInfo.email if the email query is provided
    const filteredData = email
      ? data.filter((product) => {
          const userInfoList = product.getState.map((pd) => {
            try {
              // Parse the JSON string if userInfo is stored as JsonValue
              const userInfo = typeof pd === 'string' ? JSON.parse(pd) : pd;
              return userInfo as UserInfoDto;
            } catch (error) {
              // If JSON parsing fails, skip this entry
              return null;
            }
          });

          // Check if userInfo has email and if it matches the filter
          return userInfoList.some(
            (userInfo) => userInfo?.email && userInfo.email.includes(email),
          );
        })
      : data;

    // If filtering is applied, update the total count accordingly
    const filteredTotal = email ? filteredData.length : total;

    return { data: filteredData, total: filteredTotal };
  }

  async getOrderById(id: string) {
    return await this.prisma.order.findUnique({
      where: { id: id },
    });
  }

  async updateOrder(id: string, updateData: any) {
    return await this.prisma.order.update({
      where: { id: id },
      data: updateData,
    });
  }

  async calculateTotalGrandPrice() {
    const orders = await this.prisma.order.findMany();
    return orders.reduce(
      (total, order) => total + parseFloat(order.grandPrice),
      0,
    );
  }

  async sendOrderEmail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mahamudoffice2@gmail.com',
        pass: 'dfvjjdrdquchrevg',
      },
    });

    const mailOptions = {
      from: 'mahamudoffice2@gmail.com',
      to: `mahamudoffice2@gmail.com,${email}`,
      subject: 'D Smart Uniform Solution',
      html: '<h1>Welcome</h1><p>Thanks For Order!</p>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
