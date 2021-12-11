import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Person } from '../entities/person.entity';
import { CreatePersonDto, UpdatePersonDto } from '../dtos/person.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private PersonRepository: Repository<Person>,
  ) { }

  findAll() {
    return this.PersonRepository.find();
  }

  async findOne(id: number) {
    const person = await this.PersonRepository.findOne(id);
    if (!person) {
      throw new NotFoundException(`Person #${id} not found`);
    }
    return person;
  }

  create(data: CreatePersonDto) {
    const newCustomer = this.PersonRepository.create(data);
    return this.PersonRepository.save(newCustomer);
  }

  async update(id: number, changes: UpdatePersonDto) {
    const customer = await this.findOne(id);
    this.PersonRepository.merge(customer, changes);
    return this.PersonRepository.save(customer);
  }

  remove(id: number) {
    return this.PersonRepository.delete(id);
  }
}
