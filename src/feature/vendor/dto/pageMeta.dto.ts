import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParameter } from "./pageMetaParameter.dto";

export class PageMeta {
    @ApiProperty()
    readonly pageNo: number;

    @ApiProperty()
    readonly pageSize: number;

    @ApiProperty()
    readonly name?: string;

    @ApiProperty()
    readonly email?: string;

    @ApiProperty()
    readonly phone?: string;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean

    @ApiProperty()
    readonly hasNextPage:boolean

    constructor({ itemCount, pageOption }: PageMetaDtoParameter) {
        this.pageNo = pageOption.pageNo;
        this.pageSize = pageOption.pageSize;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.pageSize);
        this.hasPreviousPage = this.pageNo > 1;
        this.hasNextPage = this.pageNo < this.pageCount;
    }

}