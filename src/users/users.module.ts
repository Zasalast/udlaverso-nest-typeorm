import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonController } from './controllers/person.controller';
import { PersonsService } from './services/persons.service';
import { Person } from './entities/person.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Person, Order, OrderItem]),
  ],
  controllers: [PersonController, UsersController, OrdersController, OrderItemController, ProfileController],
  providers: [PersonsService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService]
})
export class UsersModule { }
