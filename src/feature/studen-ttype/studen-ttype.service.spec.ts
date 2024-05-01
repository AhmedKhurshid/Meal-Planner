import { Test, TestingModule } from '@nestjs/testing';
import { StudenTtypeService } from './studen-ttype.service';

describe('StudenTtypeService', () => {
  let service: StudenTtypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudenTtypeService],
    }).compile();

    service = module.get<StudenTtypeService>(StudenTtypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
