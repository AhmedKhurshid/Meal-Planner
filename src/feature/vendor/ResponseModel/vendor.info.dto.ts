import { ApiProperty } from '@nestjs/swagger';
import { NewVendor } from './vendor-detail.dto';

export class VendorInfo {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  itemInfo: NewVendor;
}
