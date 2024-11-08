import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as express from 'express';
import { AllExceptionsFilter } from './filter-all-exceptions.filter';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // Middleware configuration
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use('/uploads', express.static('public/uploads'));

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
          children: error.children.length > 0 ? error.children : undefined,
        }));
        return new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  // Swagger Documentation setup
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start HTTP server
  const server = app.getHttpServer();

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3002',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Initialize the SocketService
  const socketService = app.get(SocketService);
  socketService.setServer(io);

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Listen on the configured port
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
