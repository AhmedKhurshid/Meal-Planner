import { STATUS } from 'core/enums';
import { PageMetaDtoParametersOrder } from './pageMetaparameterOrder.dto';
export declare class PageMetaDtoOrder {
    readonly pageNo: number;
    readonly pageSize: number;
    readonly name?: string;
    readonly email?: string;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly status?: STATUS;
    readonly phone?: string;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParametersOrder);
}
