"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../core/enums");
const HandleUniqueError_1 = require("../core/error/HandleUniqueError");
const interceptor_1 = require("../core/interceptor");
const decorators_1 = require("../core/decorators");
const guards_1 = require("../core/guards");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const lawyer_get_invite_dto_1 = require("./dto/lawyer-get&invite.dto");
const testing_1 = require("../core/common/testing");
const userDetailInfo_1 = require("./responseModel/userDetailInfo");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const getFileName_1 = require("../core/constant/getFileName");
const ResponseModel_1 = require("../core/common/ResponseModel");
const respose_code_status_1 = require("../core/enums/respose-code-status");
const filelocations_1 = require("./responseModel/filelocations");
const constant_1 = require("../core/constant");
const pageOption_dto_1 = require("../admin/dto/pageOption.dto");
const email_dto_1 = require("./dto/email.dto");
const change_forget_password_dto_1 = require("./dto/change-forget-password.dto");
const otp_verify_number_dto_1 = require("./dto/otp-verify-number.dto");
const log_in_dto_1 = require("./dto/log-in.dto");
const create_student_dto_1 = require("../feature/student/dto/create-student.dto");
const user_change_password_1 = require("./dto/user-change-password");
let AuthController = class AuthController {
    constructor(_ss) {
        this._ss = _ss;
    }
    signUpAdmin(body) {
        body.role = enums_1.ROLE.ADMIN;
        body.status = enums_1.STATUS.ACTIVE;
        try {
            return this._ss.signUpAdmin(body);
        }
        catch (e) {
            (0, HandleUniqueError_1.HandleUniqueError)(e);
        }
    }
    signupLawyer(body) {
        try {
            return this._ss.signUpLawyer(body);
        }
        catch (e) {
            (0, HandleUniqueError_1.HandleUniqueError)(e);
        }
    }
    signin(body) {
        return this._ss.signin(body);
    }
    forgetPassword(body) {
        return this._ss.forgetPassword(body);
    }
    otpverificationforget(body) {
        return this._ss.otpverificationforget(body);
    }
    forgetChangePassword(body) {
        if (body.password != body.confirmPassword) {
            return (0, constant_1.throwForbiddenExceptionPasswordNotMatch)();
        }
        return this._ss.forgetPasswordUpdate(body);
    }
    changePassword(id, { password, confirmPassword }) {
        if (password != confirmPassword) {
            return (0, constant_1.throwForbiddenExceptionPasswordNotMatch)();
        }
        return this._ss.changePassword({ id, password });
    }
    async userChangePassword(id, body) {
        if (body.oldPassword === body.password && body.password != body.confirmPassword) {
            return (0, constant_1.throwForbiddenExceptionPasswordNotMatch)();
        }
        const userChangePasswordDto = new user_change_password_1.UserChangePasswordDto();
        userChangePasswordDto.id = id;
        userChangePasswordDto.oldPassword = body.oldPassword;
        userChangePasswordDto.password = body.password;
        userChangePasswordDto.confirmPassword = body.confirmPassword;
        return this._ss.userChangePassword(userChangePasswordDto);
    }
    logout(userId) {
        return this._ss.logout(userId);
    }
    refreshTokens(userId, refreshToken) {
        return this._ss.refreshTokens(userId, refreshToken);
    }
    getLawyer(body) {
        return this._ss.getLawyerByName(body);
    }
    async uploadFile(path, file) {
        if (!(file === null || file === void 0 ? void 0 : file.filename))
            (0, constant_1.throwForbiddenExceptionFileRequried)(file === null || file === void 0 ? void 0 : file.filename);
        const resp = new filelocations_1.FlieLocation();
        const res = new ResponseModel_1.ResponseData();
        const fileaddress = `public/${path}/${file.filename}`;
        resp.location = fileaddress;
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.FILEUPLOADED];
        res.data = resp;
        return res;
    }
    async Lawyer(pageOptionsDto) {
        return await this._ss.getLawyerList(pageOptionsDto);
    }
    async Admin(pageOptionsDto) {
        return await this._ss.getAdminList(pageOptionsDto);
    }
    profile(userId) {
        return this._ss.profile(userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('admin/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUpAdmin", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('student/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupLawyer", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, testing_1.ApiResponseBody)(userDetailInfo_1.UserDetailInfo),
    (0, common_1.Post)('student/signIn'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_in_dto_1.LogInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('forget/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('forget/code/verify'),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_verify_number_dto_1.OtpVerifyNumberDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "otpverificationforget", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('forget/change/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_forget_password_dto_1.ChangeForgetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetChangePassword", null);
__decorate([
    (0, common_1.Post)('change/password'),
    (0, decorators_1.Roles)(enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('user/change/password'),
    (0, decorators_1.Roles)(enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_change_password_1.UserChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userChangePassword", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RtGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, decorators_1.GetCurrentUser)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Get)('student-name-email'),
    (0, decorators_1.Roles)(enums_1.ROLE.STUDENT),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lawyer_get_invite_dto_1.LawyerGetOrInvite]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLawyer", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('upload/:path'),
    (0, testing_1.ApiResponseBody)(filelocations_1.FlieLocation),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: getFileName_1.FolderName,
            filename: getFileName_1.FileName
        }),
        fileFilter: interceptor_1.FileTypeInterceptor,
        limits: {
            fileSize: 1024 * 5120,
            files: 1,
        },
    })),
    __param(0, (0, common_1.Param)('path')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('list/student'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Lawyer", null);
__decorate([
    (0, common_1.Get)('list/admin'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Admin", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    (0, testing_1.ApiResponseBody)(userDetailInfo_1.UserDetailInfo),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('student/profile'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "profile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map