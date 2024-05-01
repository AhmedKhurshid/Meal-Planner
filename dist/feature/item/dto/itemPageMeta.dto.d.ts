import { ItemPageOptionParameter } from './itemPageOptionParameter.dto';
export declare class ItemPageMeta {
    readonly pageNo: number;
    readonly pageSize: number;
    readonly name?: string;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
    constructor({ itemCount, itemPageOption }: ItemPageOptionParameter);
}
