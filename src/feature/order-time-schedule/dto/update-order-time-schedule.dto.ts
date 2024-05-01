import { PartialType } from '@nestjs/swagger';
import { CreateOrderTimeScheduleDto } from './create-order-time-schedule.dto';

export class UpdateOrderTimeScheduleDto extends PartialType(CreateOrderTimeScheduleDto) {}
