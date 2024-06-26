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
exports.UpdateMealDto = exports.CreateMealDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../core/enums");
class CreateMealDto {
}
exports.CreateMealDto = CreateMealDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An array of mealPlanId numbers',
        example: [1, 2],
        type: [Number],
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'mealPlanId array should not be empty' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Exactly one/two dishes are required' }),
    (0, class_validator_1.ArrayMaxSize)(2, { message: 'Exactly one/two dishes are required' }),
    (0, class_validator_1.IsNumber)({}, { each: true, message: 'Each element of mealPlanId array should be a number' }),
    __metadata("design:type", Array)
], CreateMealDto.prototype, "mealPlanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: enums_1.STATUS.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.STATUS, {
        message: 'Status must be (Active, Pending, Block, Reject)',
    }),
    __metadata("design:type", String)
], CreateMealDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateMealDto.prototype, "time", void 0);
class UpdateMealDto extends (0, swagger_1.PartialType)(CreateMealDto) {
}
exports.UpdateMealDto = UpdateMealDto;
//# sourceMappingURL=create-meal.dto.js.map