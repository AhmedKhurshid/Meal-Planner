import { ORDER, STATUS } from 'core/enums';
export declare class PageOptionsDto {
    readonly order?: ORDER;
    readonly pageNo?: number;
    readonly PageSize?: number;
    readonly search?: string;
    readonly enable?: boolean;
    readonly status?: STATUS;
    get skip(): number;
}
