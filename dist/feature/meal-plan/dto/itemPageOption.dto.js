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
exports.ItemPageOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../core/enums");
const joi_1 = require("joi");
class ItemPageOptionDto {
    constructor() {
        this.order = enums_1.ORDER.ASC;
        this.status = enums_1.VENDORSTATUS.ACTIVE;
        this.pageNo = 10;
        this.pageSize = 1;
        this.dateSearch = '';
        this.enable = true;
    }
    get skip() {
        return (this.pageNo - 1) * this.pageSize;
    }
}
exports.ItemPageOptionDto = ItemPageOptionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.ORDER, default: enums_1.ORDER.ASC }),
    (0, class_validator_1.IsEnum)(enums_1.ORDER),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ItemPageOptionDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.VENDORSTATUS, default: enums_1.VENDORSTATUS.ACTIVE }),
    (0, class_validator_1.IsEnum)(enums_1.VENDORSTATUS),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ItemPageOptionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ItemPageOptionDto.prototype, "pageNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 50, default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ItemPageOptionDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Type)(() => joi_1.date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ItemPageOptionDto.prototype, "dateSearch", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Type)(() => joi_1.boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => obj[key] === 'true'),
    __metadata("design:type", Boolean)
], ItemPageOptionDto.prototype, "enable", void 0);
//# sourceMappingURL=itemPageOption.dto.js.map