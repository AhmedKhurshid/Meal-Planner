import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from './pageMetaparameter.dto';
import { STATUS } from 'core/enums';

export class PageMetaDto {
  @ApiProperty()
  readonly pageNo: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly email?: string;

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

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.pageNo = pageOptionsDto.pageNo;
    this.pageSize = pageOptionsDto.PageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.pageNo > 1;
    this.hasNextPage = this.pageNo < this.pageCount;
  }
}

// import { ApiProperty } from "@nestjs/swagger";
// import { PageMetaDtoParameters } from "./pageMetaparameter.dto";
// import { STATUS } from "core/enums";

// export class PageMetaDto {
//   @ApiProperty()
//   readonly pageNo: number;

//   @ApiProperty()
//   readonly PageSize : number;

//   @ApiProperty()
//   readonly name?: string;

//   // @ApiProperty()
//   // readonly email?: string;

//   @ApiProperty()
//   readonly status?: STATUS;

//   @ApiProperty()
//   readonly itemCount: number;

//   @ApiProperty()
//   readonly pageCount: number;

//   @ApiProperty()
//   readonly hasPreviousPage: boolean;

//   @ApiProperty()
//   readonly hasNextPage: boolean;

//   constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
//     this.pageNo = pageOptionsDto.pageNo;
//     this.PageSize = pageOptionsDto.PageSize;
//     this.itemCount = itemCount;
//     this.pageCount = Math.ceil(this.itemCount / this.PageSize);
//     this.hasPreviousPage = this.pageNo > 1;
//     this.hasNextPage = this.pageNo < this.pageCount;
//   }
// }
