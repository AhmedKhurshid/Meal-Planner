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
exports.ForgetPassword = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validator_1 = require("../../core/validator");
class ForgetPassword {
}
exports.ForgetPassword = ForgetPassword;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'password must has special character, alpha numeric and capital / small letters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(7, 20),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password must has special character, alpha numeric and capital / small letters',
    }),
    __metadata("design:type", String)
], ForgetPassword.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'password must has special character, alpha numeric and capital / small letters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(7, 20, { message: 'Confirm Password must be equal to Password' }),
    (0, validator_1.Match)('password', {
        message: 'Confirm Password does not match with the Password',
    }),
    __metadata("design:type", String)
], ForgetPassword.prototype, "confirmPassword", void 0);
//# sourceMappingURL=forget-password.dto.js.map