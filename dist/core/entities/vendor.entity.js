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
exports.Vendor = void 0;
const typeorm_1 = require("typeorm");
const alpha_model_1 = require("./alpha-model");
const enums_1 = require("../enums");
const item_entity_1 = require("./item.entity");
let Vendor = class Vendor extends alpha_model_1.AlphaModel {
};
exports.Vendor = Vendor;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.VENDORSTATUS,
        default: enums_1.VENDORSTATUS.PENDING,
        nullable: true,
    }),
    __metadata("design:type", String)
], Vendor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 225 }),
    __metadata("design:type", String)
], Vendor.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Vendor.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Vendor.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Vendor.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (x) => x.vendorId),
    __metadata("design:type", item_entity_1.Item)
], Vendor.prototype, "item", void 0);
exports.Vendor = Vendor = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)('email', ['email'])
], Vendor);
//# sourceMappingURL=vendor.entity.js.map