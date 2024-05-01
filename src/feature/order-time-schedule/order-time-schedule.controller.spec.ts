import { Test, TestingModule } from '@nestjs/testing';
import { OrderTimeScheduleController } from './order-time-schedule.controller';
import { OrderTimeScheduleService } from './order-time-schedule.service';

describe('OrderTimeScheduleController', () => {
  let controller: OrderTimeScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTimeScheduleController],
      providers: [OrderTimeScheduleService],
    }).compile();

    controller = module.get<OrderTimeScheduleController>(OrderTimeScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
