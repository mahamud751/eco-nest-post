import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import * as nodemailer from 'nodemailer';

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

    const where: any = {};

    const dataPromise = this.prisma.order.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    let filteredData = data;

    if (email) {
      filteredData = data
        .map((order) => {
          const filteredState = order.getState.filter((stateItem: any) => {
            const userInfo = stateItem.product.userInfo;
            return userInfo?.email ? userInfo.email.includes(email) : false;
          });

          if (filteredState.length > 0) {
            return {
              ...order,
              getState: filteredState,
            };
          }
          return null;
        })
        .filter((order) => order !== null);
    }

    const filteredTotal = email ? filteredData.length : total;

    return { data: filteredData, total: filteredTotal };
  }

  async findOrdersByEmail(
    email: string,
    page: number = 1,
    perPage: number = 10,
    includeGetState?: string, // New parameter
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;

    // Base 'where' clause for orders matching the email

    const where: any = {};
    if (email) {
      where.email = {
        contains: email,
        mode: 'insensitive',
      };
    }

    // Fetch orders for the current page
    const ordersPromise = this.prisma.order.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Base total count for orders matching the email
    const totalCountPromise = this.prisma.order.count({ where });

    const [total, orders] = await Promise.all([
      totalCountPromise,
      ordersPromise,
    ]);

    // If `includeGetState` is 'yes', flatten the getState items
    if (includeGetState === 'yes') {
      const getStateItems = orders.flatMap((order) => order.getState);
      return { data: getStateItems, total }; // Return total based on orders
    }

    // Return the original orders without filtering by `getState`
    return { data: orders, total };
  }

  async findOrdersByEmailAll(
    page: number = 1,
    perPage: number = 10,
    email: string,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;

    const skip = (pageNumber - 1) * perPageNumber;

    const where: any = {
      email: {
        contains: email,
        mode: 'insensitive',
      },
    };

    const ordersPromise = this.prisma.order.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Fetch the total number of orders matching the email criteria
    const totalCountPromise = this.prisma.order.count({ where });

    const [orders] = await Promise.all([ordersPromise, totalCountPromise]);

    // Map the last data to getState
    const getStateItems = orders.flatMap((order) => order.getState);

    // Set total to the number of getState items
    const totalGetStateCount = getStateItems.length;

    return { data: getStateItems, total: totalGetStateCount };
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
