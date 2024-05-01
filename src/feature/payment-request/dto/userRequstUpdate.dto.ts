import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserRequstUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
