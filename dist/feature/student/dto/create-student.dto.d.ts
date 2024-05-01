import { AdminLawyerDto } from "admin/dto/adminLawyer.dto";
import { ROLE } from "core/enums";
export declare class CreateStudentDto extends AdminLawyerDto {
    type: number;
    secPhone: string;
    allergies: string;
    role: ROLE;
}
