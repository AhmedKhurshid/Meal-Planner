import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PAYMENTREQUEST } from 'core/enums';

export class CreatePaymentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

}
