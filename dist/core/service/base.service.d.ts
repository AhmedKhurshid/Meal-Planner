import { Repository } from 'typeorm';
import { CoreService } from './core.service';
import { ResponseData } from 'core/common/ResponseModel';
export declare class BaseService extends CoreService {
    repo: Repository<any>;
    findAll(): Promise<any[]> | {
        message: string;
    };
    findOne(id: number): Promise<any>;
    createSimple(data: any): Promise<any>;
    updateSimple(id: number, data: any, cb?: any): Promise<ResponseData<unknown> | {
        message: string;
    }>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    delFile(filename: string): Promise<void>;
}
