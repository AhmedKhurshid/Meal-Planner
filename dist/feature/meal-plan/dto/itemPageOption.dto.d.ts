import { ORDER, VENDORSTATUS } from 'core/enums';
export declare class ItemPageOptionDto {
    readonly order?: ORDER;
    readonly status?: VENDORSTATUS;
    readonly pageNo?: number;
    readonly pageSize?: number;
    readonly dateSearch?: string;
    readonly enable?: boolean;
    get skip(): number;
}
