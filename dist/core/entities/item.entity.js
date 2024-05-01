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
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const alpha_model_1 = require("./alpha-model");
const user_entity_1 = require("./user.entity");
const mealPlan_entity_1 = require("./mealPlan.entity");
const vendor_entity_1 = require("./vendor.entity");
const enums_1 = require("../enums");
let Item = class Item extends alpha_model_1.AlphaModel {
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Item.prototype, "costPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'double' }),
    __metadata("design:type", Number)
], Item.prototype, "markupPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ITEM, default: enums_1.ITEM.ACTIVE }),
    __metadata("design:type", String)
], Item.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'No Image Provided', length: 200 }),
    __metadata("design:type", String)
], Item.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.item),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_user_item' }),
    __metadata("design:type", user_entity_1.User)
], Item.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mealPlan_entity_1.MealPlan, (x) => x.itemId),
    __metadata("design:type", mealPlan_entity_1.MealPlan)
], Item.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, (vendor) => vendor.item),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_vendor_item' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Item.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "vendorId", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
//# sourceMappingURL=item.entity.js.map