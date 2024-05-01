import { AdminService } from './admin.service';
import { ChangeStatusDto } from './dto';
import { Tokens } from 'auth/types';
import { AdminLawyerDto } from './dto/adminLawyer.dto';
import { PageOptionsDto } from './dto/pageOption.dto';
import { CreateDto } from 'core/base';
import { UpdateStudentDto } from 'feature/student/dto/update-student.dto';
export declare class AdminController {
    _ss: AdminService;
    constructor(_ss: AdminService);
    changeLawyerStatus(body: ChangeStatusDto, id: number): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    updateStudentInfo(body: UpdateStudentDto, id: number): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    getLawyers(): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    getLawyer(id: number): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    signupLawyer(body: AdminLawyerDto): Promise<Tokens>;
    suggestionList(pageOptionsDto: PageOptionsDto): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    getServiceFormList(pageOptionsDto: PageOptionsDto): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    create(createCaseLawDto: CreateDto): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    delete(id: number): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
    Notification(pageOptionsDto: PageOptionsDto): Promise<import("../core/common/ResponseModel").ResponseData<unknown>>;
}
