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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../core/decorators");
const enums_1 = require("../core/enums");
const admin_service_1 = require("./admin.service");
const dto_1 = require("./dto");
const decorators_2 = require("@nestjs/common/decorators");
const serializer_1 = require("@nestjs/common/serializer");
const HandleUniqueError_1 = require("../core/error/HandleUniqueError");
const adminLawyer_dto_1 = require("./dto/adminLawyer.dto");
const pageOption_dto_1 = require("./dto/pageOption.dto");
const base_1 = require("../core/base");
const update_student_dto_1 = require("../feature/student/dto/update-student.dto");
let AdminController = class AdminController {
    constructor(_ss) {
        this._ss = _ss;
    }
    changeLawyerStatus(body, id) {
        return this._ss.changeStatusUser(body, id);
    }
    updateStudentInfo(body, id) {
        return this._ss.updateStudentInfo(body, id);
    }
    getLawyers() {
        return this._ss.getLawyers();
    }
    getLawyer(id) {
        return this._ss.getLawyer(id);
    }
    signupLawyer(body) {
        try {
            return this._ss.signUpLawyer(body);
        }
        catch (e) {
            (0, HandleUniqueError_1.HandleUniqueError)(e);
        }
    }
    async suggestionList(pageOptionsDto) {
        return await this._ss.getLawyerList(pageOptionsDto);
    }
    async getServiceFormList(pageOptionsDto) {
        return await this._ss.getServiceFormList(pageOptionsDto);
    }
    create(createCaseLawDto) {
        return this._ss.createNotification(createCaseLawDto);
    }
    delete(id) {
        return this._ss.deleteNotification(id);
    }
    async Notification(pageOptionsDto) {
        return await this._ss.getNotificationList(pageOptionsDto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Patch)('student/change/status/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChangeStatusDto, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeLawyerStatus", null);
__decorate([
    (0, common_1.Patch)('update/student/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_student_dto_1.UpdateStudentDto, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateStudentInfo", null);
__decorate([
    (0, common_1.Get)('student'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_2.UseInterceptors)(serializer_1.ClassSerializerInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getLawyers", null);
__decorate([
    (0, common_1.Get)('student/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getLawyer", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, common_1.Post)('student/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminLawyer_dto_1.AdminLawyerDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signupLawyer", null);
__decorate([
    (0, common_1.Get)('list/student'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_2.UseInterceptors)(serializer_1.ClassSerializerInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suggestionList", null);
__decorate([
    (0, common_1.Get)('list/service/form'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getServiceFormList", null);
__decorate([
    (0, common_1.Post)('create/notification'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_1.CreateDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "create", null);
__decorate([
    (0, decorators_2.Delete)('delete/notification/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('list/notification'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Notification", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map