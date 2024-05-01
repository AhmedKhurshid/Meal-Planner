import { ORDER } from 'core/enums';
export declare class ItemPageOptionDto {
    readonly order?: ORDER;
    readonly pageNo?: number;
    readonly pageSize?: number;
    readonly seacrh?: string;
    readonly enable?: boolean;
    get skip(): number;
}
