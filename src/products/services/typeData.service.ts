import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeData } from '../entities/typedata.entity';
import { CreateTypeDataDto, UpdateTypeDataDto } from '../dtos/typedata.dtos';

@Injectable()
export class TypeDateService {
  constructor(@InjectRepository(TypeData) private typeDataRepository: Repository<TypeData>) { }

  findAll() {
    return this.typeDataRepository.find();
  }

  findOne(id: number) {
    const product = this.typeDataRepository.findOne({
      relations: ['products'],
    });
    if (!product) {
      throw new NotFoundException(`TypeData #${id} not found`);
    }
    return product;
  }

  create(data: CreateTypeDataDto) {
    const newTypeData = this.typeDataRepository.create(data);
    return this.typeDataRepository.save(newTypeData);
  }

  async update(id: number, changes: UpdateTypeDataDto) {
    const typeData = await this.findOne(id);
    this.typeDataRepository.merge(typeData, changes);
    return this.typeDataRepository.save(typeData);
  }

  remove(id: number) {
    return this.typeDataRepository.delete(id);
  }
}
