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
exports.MealPlan = void 0;
const typeorm_1 = require("typeorm");
const alpha_model_1 = require("./alpha-model");
const enums_1 = require("../enums");
const item_entity_1 = require("./item.entity");
const order_entity_1 = require("./order.entity");
let MealPlan = class MealPlan extends alpha_model_1.AlphaModel {
};
exports.MealPlan = MealPlan;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.VENDORSTATUS,
        default: enums_1.VENDORSTATUS.ACTIVE,
        nullable: true,
    }),
    __metadata("design:type", String)
], MealPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MealPlan.prototype, "meal_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.Item, (x) => x.item),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_mealPlan' }),
    __metadata("design:type", item_entity_1.Item)
], MealPlan.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MealPlan.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.mealPlanId),
    __metadata("design:type", Array)
], MealPlan.prototype, "mealPlan", void 0);
exports.MealPlan = MealPlan = __decorate([
    (0, typeorm_1.Entity)()
], MealPlan);
//# sourceMappingURL=mealPlan.entity.js.map