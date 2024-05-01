import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from 'core/enums';
import { PageMetaDtoParametersInvoice } from './pageMetaparameterInvoice.dto';

export class PageMetaDtoInvoice {
  @ApiProperty()
  readonly pageNo: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly email?: string;

  @ApiProperty()
  readonly startDate?: string;

  // @ApiProperty()
  // readonly gender?: GENDER;

  @ApiProperty()
  readonly endDate?: string;

  @ApiProperty()
  readonly status?: STATUS;

  @ApiProperty()
  readonly phone?: string;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, }: PageMetaDtoParametersInvoice) {
    // this.pageNo = pageOptionsDto.pageNo;
    this.startDate = pageOptionsDto.startDate;
    // this.gender = pageOptionsDto.gender;
    this.endDate = pageOptionsDto.endDate;
    // this.pageNo = pageOptionsDto.pageNo;
    // this.pageSize = pageOptionsDto.PageSize;
    // this.itemCount = itemCount;
    // this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    // this.hasPreviousPage = this.pageNo > 1;
    // this.hasNextPage = this.pageNo < this.pageCount;
  }
}
