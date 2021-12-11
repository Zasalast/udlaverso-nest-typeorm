import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { TypeDataController } from './controllers/typedata.controller';
import { TypeDateService } from './services/typeData.service';
import { TypeData } from './entities/typedata.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, TypeData, Category])],
  controllers: [ProductsController, CategoriesController, TypeDataController],
  providers: [ProductsService, TypeDateService, CategoriesService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule { }
