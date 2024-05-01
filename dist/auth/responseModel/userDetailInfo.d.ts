import { LoginUserDetail } from "./userDetail";
import { LoginStudentDetail } from "./studentDetail";
import { LoginStudentTypeDetail } from "./typeDetail";
export declare class UserDetailInfo {
    accessToken: string;
    refreshToken: string;
    userDetails: LoginUserDetail;
    studentDetail: LoginStudentDetail;
    typeDetail: LoginStudentTypeDetail;
}
