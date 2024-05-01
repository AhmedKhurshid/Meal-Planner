import { BaseService } from 'core/service';
export declare abstract class BaseController {
    _ss: BaseService;
    findAll(): Promise<any[]> | {
        message: string;
    };
    findOne(id: number): Promise<any>;
}
