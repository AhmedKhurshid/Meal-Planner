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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
const userDetail_1 = require("./userDetail");
const studentDetail_1 = require("./studentDetail");
const typeDetail_1 = require("./typeDetail");
class UserDetailInfo {
}
exports.UserDetailInfo = UserDetailInfo;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailInfo.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailInfo.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", userDetail_1.LoginUserDetail)
], UserDetailInfo.prototype, "userDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", studentDetail_1.LoginStudentDetail)
], UserDetailInfo.prototype, "studentDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeDetail_1.LoginStudentTypeDetail)
], UserDetailInfo.prototype, "typeDetail", void 0);
//# sourceMappingURL=userDetailInfo.js.map