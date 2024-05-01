import { JwtService } from '@nestjs/jwt';
import { User } from 'core/entities';
import { ROLE, STATUS } from 'core/enums';
import { CoreService } from 'core/service';
import { SignUpDto } from './dto';
import { SignInDto } from './dto/sign-in.dto';
import { Tokens } from './types';
import { ResponseData } from 'core/common/ResponseModel';
import { UserDetailInfo } from './responseModel/userDetailInfo';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';
import { EmailDto } from './dto/email.dto';
import { ChangeForgetPasswordDto } from './dto/change-forget-password.dto';
import { OtpVerifyNumberDto } from './dto/otp-verify-number.dto';
import { CreateStudentDto } from 'feature/student/dto/create-student.dto';
import { UserChangePasswordDto } from './dto/user-change-password';
export declare class AuthService extends CoreService {
    private _jwt;
    constructor(_jwt: JwtService);
    signUpAdmin(data: SignUpDto): Promise<ResponseData<unknown>>;
    signUpLawyer(data: CreateStudentDto): Promise<any>;
    signUpLocal(data: SignUpDto): Promise<Tokens>;
    signin(dto: SignInDto): Promise<ResponseData<unknown>>;
    forgetPassword(body: EmailDto): Promise<ResponseData<unknown>>;
    otpverificationforget({ email, code }: OtpVerifyNumberDto): Promise<ResponseData<unknown>>;
    forgetPasswordUpdate(body: ChangeForgetPasswordDto): Promise<ResponseData<unknown>>;
    changePassword({ id, password }: {
        id: any;
        password: any;
    }): Promise<ResponseData<unknown>>;
    userChangePassword(dto: UserChangePasswordDto): Promise<ResponseData<unknown>>;
    logout(id: number): Promise<boolean>;
    refreshTokens(id: number, rt: string): Promise<Tokens>;
    returnGeneratedToken(user: User): Promise<Tokens>;
    getTokens({ id, email, role, name }: {
        id: any;
        email: any;
        role: any;
        name: any;
    }): Promise<Tokens>;
    updateRtHash(id: number, rt: string): Promise<void>;
    returnedSearializedUser({ id, name, email, gender, phone, role, status, }: User): {
        id: number;
        name: string;
        email: string;
        gender: import("core/enums").GENDER;
        phone: string;
        role: ROLE;
        status: STATUS;
    };
    getLawyerByName({ name, email }: {
        name: any;
        email: any;
    }): Promise<User[]>;
    getLawyerList(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
    getAdminList(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
    profile(id: number): Promise<ResponseData<UserDetailInfo>>;
}
