import { ApiProperty } from '@nestjs/swagger';

export class LoginStudentDetail {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: number;

  @ApiProperty()
  secPhone: string;

  @ApiProperty()
  allergies: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  paid_balance: number;

  @ApiProperty()
  total_balance: number;
}
