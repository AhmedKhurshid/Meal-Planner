import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { OrderTimeScheduleService } from './order-time-schedule.service';
import { CreateOrderTimeScheduleDto } from './dto/create-order-time-schedule.dto';
import { UpdateOrderTimeScheduleDto } from './dto/update-order-time-schedule.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'core/decorators';
import { ROLE } from 'core/enums';
import { PageOptionDto } from 'feature/vendor/dto/pageOption.dto';

@Controller('order-time-schedule')
@ApiTags('OrderTimeSchedule')
export class OrderTimeScheduleController {
  constructor(public orderTimeScheduleService: OrderTimeScheduleService) {}

  @Post('order/timeSchedule')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  create(@Body() createOrderTimeScheduleDto: CreateOrderTimeScheduleDto) {
    return this.orderTimeScheduleService.create(createOrderTimeScheduleDto);
  }

  @Get('order/timeSchedule/list')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  findAll() {
    return this.orderTimeScheduleService.findAll();
  }

  @Get('order/timeSchedule/:id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return await this.orderTimeScheduleService.findOne(id);
  }

  @Put('update/timeSchedule/:id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() updateOrderTimeScheduleDto: UpdateOrderTimeScheduleDto) {
    return await this.orderTimeScheduleService.update(id, updateOrderTimeScheduleDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.orderTimeScheduleService.remove(+id);
  }
}
