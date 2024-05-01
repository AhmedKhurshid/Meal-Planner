import { Test, TestingModule } from '@nestjs/testing';
import { OrderTimeScheduleService } from './order-time-schedule.service';

describe('OrderTimeScheduleService', () => {
  let service: OrderTimeScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTimeScheduleService],
    }).compile();

    service = module.get<OrderTimeScheduleService>(OrderTimeScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
