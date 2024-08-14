import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { ProductModule } from './products/products.module';
import { BannerModule } from './banner/banner.module';
import { AuditModule } from './audit/audit.module';
import { BlogModule } from './blog/blog.module';
import { AdvanceModule } from './advance/advance.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UsersModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    BannerModule,
    AuditModule,
    BlogModule,
    AdvanceModule,
    DemoModule,
  ],
})
export class AppModule {}
