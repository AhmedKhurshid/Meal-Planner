import { PageMetaDtoParameters } from './pageMetaparameter.dto';
import { STATUS } from 'core/enums';
export declare class PageMetaDto {
    readonly pageNo: number;
    readonly pageSize: number;
    readonly name?: string;
    readonly email?: string;
    readonly status?: STATUS;
    readonly phone?: string;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters);
}
