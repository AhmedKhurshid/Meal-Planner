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
exports.PageMetaDtoOrder = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../core/enums");
class PageMetaDtoOrder {
    constructor({ pageOptionsDto, itemCount }) {
        this.pageNo = pageOptionsDto.pageNo;
        this.startDate = pageOptionsDto.startDate;
        this.endDate = pageOptionsDto.endDate;
        this.pageNo = pageOptionsDto.pageNo;
        this.pageSize = pageOptionsDto.PageSize;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.pageSize);
        this.hasPreviousPage = this.pageNo > 1;
        this.hasNextPage = this.pageNo < this.pageCount;
    }
}
exports.PageMetaDtoOrder = PageMetaDtoOrder;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDtoOrder.prototype, "pageNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDtoOrder.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PageMetaDtoOrder.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PageMetaDtoOrder.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PageMetaDtoOrder.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PageMetaDtoOrder.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PageMetaDtoOrder.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PageMetaDtoOrder.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDtoOrder.prototype, "itemCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PageMetaDtoOrder.prototype, "pageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PageMetaDtoOrder.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PageMetaDtoOrder.prototype, "hasNextPage", void 0);
//# sourceMappingURL=pageMetaOrder.js.map