import { StudenTtypeService } from './studen-ttype.service';
import { CreateStudenTtypeDto } from './dto/create-studen-ttype.dto';
import { UpdateStudenTtypeDto } from './dto/update-studen-ttype.dto';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';
export declare class StudenTtypeController {
    private readonly studenTtypeService;
    constructor(studenTtypeService: StudenTtypeService);
    create(createStudenTtypeDto: CreateStudenTtypeDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAll(pageOptionsDto: PageOptionsDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findOne(id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    update(id: number, updateStudenTtypeDto: UpdateStudenTtypeDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    remove(id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
}
