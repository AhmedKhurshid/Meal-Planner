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
exports.Meal = void 0;
const typeorm_1 = require("typeorm");
const item_entity_1 = require("./item.entity");
const alpha_model_1 = require("./alpha-model");
const user_entity_1 = require("./user.entity");
const enums_1 = require("../enums");
let Meal = class Meal extends alpha_model_1.AlphaModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Meal.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.STATUS,
        default: enums_1.STATUS.PENDING,
        nullable: true,
    }),
    __metadata("design:type", String)
], Meal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (x) => x.userMeal),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_user_meal' }),
    __metadata("design:type", user_entity_1.User)
], Meal.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.Item, (x) => x.item),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_item_meal' }),
    __metadata("design:type", Meal)
], Meal.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "itemId", void 0);
Meal = __decorate([
    (0, typeorm_1.Entity)()
], Meal);
exports.Meal = Meal;
//# sourceMappingURL=meal.entity.js.map