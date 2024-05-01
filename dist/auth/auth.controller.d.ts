/// <reference types="multer" />
import { UPLOAD_PATH } from 'core/enums';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { LawyerGetOrInvite } from './dto/lawyer-get&invite.dto';
import { Tokens } from './types';
import { UserDetailInfo } from './responseModel/userDetailInfo';
import { ResponseData } from 'core/common/ResponseModel';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';
import { EmailDto } from './dto/email.dto';
import { ChangeForgetPasswordDto } from './dto/change-forget-password.dto';
import { OtpVerifyNumberDto } from './dto/otp-verify-number.dto';
import { LogInDto } from './dto/log-in.dto';
import { CreateStudentDto } from 'feature/student/dto/create-student.dto';
import { UserChangePasswordDto } from './dto/user-change-password';
export declare class AuthController {
    private _ss;
    constructor(_ss: AuthService);
    signUpAdmin(body: SignUpDto): Promise<ResponseData<unknown>>;
    signupLawyer(body: CreateStudentDto): Promise<Tokens>;
    signin(body: LogInDto): Promise<ResponseData<unknown>>;
    forgetPassword(body: EmailDto): Promise<ResponseData<unknown>>;
    otpverificationforget(body: OtpVerifyNumberDto): Promise<ResponseData<unknown>>;
    forgetChangePassword(body: ChangeForgetPasswordDto): ResponseData<unknown> | Promise<ResponseData<unknown>>;
    changePassword(id: string, { password, confirmPassword }: {
        password: any;
        confirmPassword: any;
    }): ResponseData<unknown> | Promise<ResponseData<unknown>>;
    userChangePassword(id: number, body: UserChangePasswordDto): Promise<ResponseData<unknown>>;
    logout(userId: number): Promise<boolean>;
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
    getLawyer(body: LawyerGetOrInvite): Promise<import("../core/entities").User[]>;
    uploadFile(path: UPLOAD_PATH, file: Express.Multer.File): Promise<ResponseData<unknown>>;
    Lawyer(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
    Admin(pageOptionsDto: PageOptionsDto): Promise<ResponseData<unknown>>;
    profile(userId: number): Promise<ResponseData<UserDetailInfo>>;
}
