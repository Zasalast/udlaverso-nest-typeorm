import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { Person } from './../entities/person.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) { }

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.personId) {
      const person = await this.personRepository.findOne(data.personId);
      order.person = person;
    }
    return this.orderRepository.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepository.findOne(id);
    if (changes.personId) {
      const person = await this.personRepository.findOne(changes.personId);
      order.person = person;
    }
    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
  ordersByRole(personId: number) {
    return this.orderRepository.find({
      where: {
        person: personId,
      },
    });
  }
}
