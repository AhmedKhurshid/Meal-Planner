import { ORDER, STATUS } from 'core/enums';
export declare class PageOptionsDtoOrder {
    readonly order?: ORDER;
    readonly pageNo?: number;
    readonly PageSize?: number;
    readonly search?: string;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly enable?: boolean;
    readonly status?: STATUS;
    get skip(): number;
}
