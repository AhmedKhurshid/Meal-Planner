import { Module } from '@nestjs/common';
import { StudenTtypeService } from './studen-ttype.service';
import { StudenTtypeController } from './studen-ttype.controller';

@Module({
  controllers: [StudenTtypeController],
  providers: [StudenTtypeService]
})
export class StudenTtypeModule {}
