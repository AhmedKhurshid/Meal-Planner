import { Module } from '@nestjs/common';
import { OrderTimeScheduleService } from './order-time-schedule.service';
import { OrderTimeScheduleController } from './order-time-schedule.controller';

@Module({
  controllers: [OrderTimeScheduleController],
  providers: [OrderTimeScheduleService],
})
export class OrderTimeScheduleModule {}
