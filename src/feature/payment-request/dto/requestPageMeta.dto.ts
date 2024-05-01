import { ApiProperty } from '@nestjs/swagger';
import { RequestPageOptionParameter } from './requestPageOptionParameter.dto';

export class RequestPageMeta {
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

  constructor({ itemCount, requestPageOption }: RequestPageOptionParameter) {
    this.pageNo = requestPageOption.pageNo;
    this.pageSize = requestPageOption.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.pageNo > 1;
    this.hasNextPage = this.pageNo < this.pageCount;
  }
}
