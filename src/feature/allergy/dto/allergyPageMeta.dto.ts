import { ApiProperty } from '@nestjs/swagger';
import { AllergyPageOptionParameter } from './allergyPageOptionParameter.dto';

export class AllergyPageMeta {
  @ApiProperty()
  readonly pageNo: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  constructor({ itemCount, allergyPageOption }: AllergyPageOptionParameter) {
    this.pageNo = allergyPageOption.pageNo;
    this.pageSize = allergyPageOption.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.pageNo > 1;
    this.hasNextPage = this.pageNo < this.pageCount;
  }
}
