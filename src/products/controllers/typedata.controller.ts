import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TypeDateService } from '../services/typeData.service';
import { CreateTypeDataDto, UpdateTypeDataDto } from '../dtos/typedata.dtos';

@ApiTags('typedata')
@Controller('typedata')
export class TypeDataController {
  constructor(private typeDataService: TypeDateService) { }

  @Get()
  findAll() {
    return this.typeDataService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.typeDataService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTypeDataDto) {
    return this.typeDataService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTypeDataDto,
  ) {
    return this.typeDataService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.typeDataService.remove(+id);
  }
}
