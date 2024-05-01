import { CoreService } from 'core/service';
import { ChangeStatusDto } from './dto/admin.dto';
import { AdminLawyerDto } from './dto/adminLawyer.dto';
import { ResponseData } from 'core/common/ResponseModel';
import { PageOptionsDto } from './dto/pageOption.dto';
import { CreateDto } from 'core/base';
import { UpdateStudentDto } from 'feature/student/dto/update-student.dto';
export declare class AdminService extends CoreService {
    private userSelectiveColumns;
    changeStatusUser({ status }: ChangeStatusDto, id: number): Promise<ResponseData<unknown>>;
    updateStudentInfo(data: UpdateStudentDto, id: number): Promise<ResponseData<unknown>>;
    getLawyers(): Promise<ResponseData<unknown>>;
    getLawyer(id: number): Promise<ResponseData<unknown>>;
    signUpLawyer(data: AdminLawyerDto): Promise<any>;
    getLawyerList(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
    getServiceFormList(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
    createNotification(body: CreateDto): Promise<ResponseData<unknown>>;
    deleteNotification(id: number): Promise<ResponseData<unknown>>;
    getNotificationList(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
}
