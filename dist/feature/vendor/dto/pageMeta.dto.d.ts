import { PageMetaDtoParameter } from "./pageMetaParameter.dto";
export declare class PageMeta {
    readonly pageNo: number;
    readonly pageSize: number;
    readonly name?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor({ itemCount, pageOption }: PageMetaDtoParameter);
}
