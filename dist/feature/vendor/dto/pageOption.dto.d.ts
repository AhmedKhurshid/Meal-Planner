import { ORDER } from "core/enums";
export declare class PageOptionDto {
    readonly order?: ORDER;
    readonly pageNo?: number;
    readonly pageSize?: number;
    readonly search?: string;
    readonly enable?: boolean;
    get skip(): number;
}
