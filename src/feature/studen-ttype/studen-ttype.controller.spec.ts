import { Test, TestingModule } from '@nestjs/testing';
import { StudenTtypeController } from './studen-ttype.controller';
import { StudenTtypeService } from './studen-ttype.service';

describe('StudenTtypeController', () => {
  let controller: StudenTtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudenTtypeController],
      providers: [StudenTtypeService],
    }).compile();

    controller = module.get<StudenTtypeController>(StudenTtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
