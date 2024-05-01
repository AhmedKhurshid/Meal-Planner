import { PartialType } from '@nestjs/swagger';
import { CreateStudenTtypeDto } from './create-studen-ttype.dto';

export class UpdateStudenTtypeDto extends PartialType(CreateStudenTtypeDto) {}
