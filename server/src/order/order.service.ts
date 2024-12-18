import * as nodemailer from 'nodemailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotificationService } from 'src/notification/notification.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuditLogService } from 'src/audit/audit.service';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
    private readonly auditLogService: AuditLogService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { ...createOrderDto },
    });

    const notification = await this.notificationService.createNotification({
      userEmail: order.email,
      orderId: order.id,
      message: `Your order has been placed successfully.`,
    });

    this.notificationGateway.emitNotification(notification);

    await this.sendOrderEmail(createOrderDto.email);

    return order;
  }

  async findAll(
    page: number = 1,
    perPage: number = 10,
    email?: string,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = perPage ? Number(perPage) : null;
    const skip = (pageNumber - 1) * (perPageNumber || 0);

    const totalCountPromise = this.prisma.order.count();

    const where: any = {};

    const dataPromise = this.prisma.order.findMany({
      skip: perPageNumber ? skip : undefined,
      take: perPageNumber || undefined,
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
    allOrder?: string,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;
    const skip = (pageNumber - 1) * perPageNumber;

    const where: any = {};
    if (email) {
      where.email = {
        contains: email,
        mode: 'insensitive',
      };
    }

    const ordersPromise = this.prisma.order.findMany({
      skip,
      take: perPageNumber,
      where,
      orderBy: { createdAt: 'desc' },
    });

    const totalCountPromise = this.prisma.order.count({ where });

    const [total, orders] = await Promise.all([
      totalCountPromise,
      ordersPromise,
    ]);

    if (allOrder === 'yes') {
      const getStateItems = orders.flatMap((order) => order.getState);
      const totalGetStateCount = getStateItems.length;
      return { data: getStateItems, total: totalGetStateCount };
    }

    return { data: orders, total };
  }

  async getOrderById(id: string) {
    return await this.prisma.order.findUnique({
      where: { id: id },
    });
  }

  async updateOrder(id: string, updateData: UpdateOrderDto) {
    const oldOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!oldOrder) {
      throw new NotFoundException('Order not found');
    }
    const updatedOrder = await this.prisma.order.update({
      where: { id: id },
      data: updateData,
    });

    if (updateData.status) {
      await this.notificationService.createNotification({
        userEmail: updatedOrder.email,
        orderId: updatedOrder.id,
        message: `Your order status has been updated to ${updateData.status}.`,
      });
    }

    await this.auditLogService.log(
      id,
      'Order',
      'UPDATE',
      oldOrder,
      updatedOrder,
    );

    return { message: 'Order updated successfully', updatedOrder };
  }

  async getRiderOrder(
    userId: string,
    page: number = 1,
    perPage: number = 10,
  ): Promise<{ data: any[]; total: number }> {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Number(perPage) || 10;

    const skip = (pageNumber - 1) * perPageNumber;

    const totalCountPromise = this.prisma.order.count({
      where: {
        riderIds: {
          has: userId,
        },
      },
    });

    const dataPromise = this.prisma.order.findMany({
      where: {
        riderIds: {
          has: userId,
        },
      },
      skip,
      take: perPageNumber,
      orderBy: { createdAt: 'desc' },
    });

    const [total, data] = await Promise.all([totalCountPromise, dataPromise]);

    return { data, total };
  }

  async assignRiderToOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { rider: true },
    });
    if (!order) {
      throw new NotFoundException('Order product not found');
    }
    if (updateOrderDto.riderIds) {
      await this.prisma.order.update({
        where: { id },
        data: {
          riderIds: {
            set: updateOrderDto.riderIds,
          },
        },
      });
    }
    return { message: 'Order rider assignment updated successfully' };
  }

  async calculateTotalGrandPrice() {
    const orders = await this.prisma.order.findMany();
    const totalGrandPrice = orders.reduce(
      (total, order) => total + parseFloat(order.grandPrice),
      0,
    );
    return {
      data: {
        totalGrandPrice,
      },
    };
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
