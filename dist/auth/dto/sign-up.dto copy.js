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
exports.SignUpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validator_1 = require("../../core/validator");
const sign_in_dto_1 = require("./sign-in.dto");
const user_req_field_dto_1 = require("./user-req-field.dto");
class SignUpDto extends (0, swagger_1.IntersectionType)(sign_in_dto_1.SignInDto, user_req_field_dto_1.UserReqFieldDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'password must has special character, alpha numeric and capital / small letters',
    }),
    (0, class_validator_1.Length)(7, 20, { message: 'Confirm Password must be equal to Password' }),
    (0, validator_1.Match)('password', {
        message: 'Confirm Password does not match with the Password',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "confirmPassword", void 0);
exports.SignUpDto = SignUpDto;
//# sourceMappingURL=sign-up.dto%20copy.js.map