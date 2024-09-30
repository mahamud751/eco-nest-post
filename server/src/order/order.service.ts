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

  async getOrders() {
    return await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrderById(id: string) {
    return await this.prisma.order.findUnique({
      where: { id: id },
    });
  }

  async getOrdersByEmail(email: string) {
    return await this.prisma.order.findMany({
      where: { email },
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
