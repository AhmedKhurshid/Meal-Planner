import { ApiProperty } from '@nestjs/swagger';

export class NewVendor {
  @ApiProperty({
    description: 'Add Vendor First',
  })
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  paid: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  total: number;
}
