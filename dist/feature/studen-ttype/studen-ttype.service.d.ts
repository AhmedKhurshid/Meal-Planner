import { CreateStudenTtypeDto } from './dto/create-studen-ttype.dto';
import { UpdateStudenTtypeDto } from './dto/update-studen-ttype.dto';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';
export declare class StudenTtypeService extends CoreService {
    create(body: CreateStudenTtypeDto): Promise<ResponseData<unknown>>;
    findAll(): Promise<ResponseData<unknown>>;
    findOne(id: number): Promise<ResponseData<unknown>>;
    update(id: number, body: UpdateStudenTtypeDto): Promise<ResponseData<unknown>>;
    remove(id: number): Promise<ResponseData<unknown>>;
    getNotificationList(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
}
