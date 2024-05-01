import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderTimeScheduleDto } from './dto/create-order-time-schedule.dto';
import { UpdateOrderTimeScheduleDto } from './dto/update-order-time-schedule.dto';
import { ResponseData } from 'core/common/ResponseModel';
import { OrderTimeScheduleController } from './order-time-schedule.controller';
import { CoreService } from 'core/service';
import Response from 'superagent/lib/node/response';
import { RESPOSE_CODE_MESSAGE } from 'core/enums';
import { OrderTimeSchedule } from 'core/entities/order-time-schedule.entity';

@Injectable()
export class OrderTimeScheduleService extends CoreService {
  async create(data: CreateOrderTimeScheduleDto) {
    const res = new ResponseData();

    const orderrTime: OrderTimeSchedule = {
      orderTimeIn: data.orderTimeIn,
      orderTimeOut: data.orderTimeOut,
    };

    const create = this.repos.orderTime.create(orderrTime);
    await this.repos.orderTime.save(create);

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULECREATED];
    res.data = orderrTime;
    return res;
  }

  async findAll() {
    const res = new ResponseData();

    const timeSchedules = await this.repos.orderTime.find();

    if (timeSchedules.length == 0) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULENOTFOUND];
      return res;
    }

    const formattedTimeSchedules = timeSchedules.map(schedule => ({
      id: schedule.id,
      orderTime: `${schedule.orderTimeIn} : ${schedule.orderTimeOut}`
    }));

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULEFOUND];
    res.data = formattedTimeSchedules;
    return res;
  }

  async findOne(id: number) {
    const res = new ResponseData();
    const timeSchedule = await this.repos.orderTime.findOneBy({ id });
    if (!timeSchedule) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULENOTFOUND];
      return res;
    }
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULEFOUND];
    res.data = timeSchedule;
    return res;
  }

  async update(id: number, body: UpdateOrderTimeScheduleDto) {
    const res = new ResponseData();

    const timeSchedule = await this.repos.orderTime.findOneBy({ id: id });
    console.log('timeSchedule');
    console.log(timeSchedule);

    if (!timeSchedule) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULEUPDATED];
      return res;
    }

    await this.repos.orderTime.update(id, body);
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ORDERTIMESCHEDULEFOUND];
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} orderTimeSchedule`;
  }
}
