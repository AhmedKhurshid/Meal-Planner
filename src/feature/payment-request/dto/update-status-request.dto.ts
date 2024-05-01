import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PAYMENTREQUEST } from 'core/enums';

export class UpdateStatusRequestDto {
  @ApiProperty({ default: PAYMENTREQUEST.PENDING })
  @IsNotEmpty()
  @IsEnum(PAYMENTREQUEST)
  status: PAYMENTREQUEST.PENDING;

}
