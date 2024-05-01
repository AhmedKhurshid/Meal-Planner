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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const common_1 = require("@nestjs/common");
const meal_service_1 = require("./meal.service");
const create_meal_dto_1 = require("./dto/create-meal.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../core/decorators");
const enums_1 = require("../../core/enums");
const pageOptionOrder_dto_1 = require("./dto/pageOptionOrder.dto");
let MealController = class MealController {
    constructor(mealService) {
        this.mealService = mealService;
    }
    create(id, createMealDto) {
        createMealDto.userId = id;
        return this.mealService.create(createMealDto);
    }
    async findAllUserMeal(id, pageOptionsDto) {
        return await this.mealService.findAllUserMeal({ id }, pageOptionsDto);
    }
    async findAll(pageOptionsDto) {
        return await this.mealService.findAll(pageOptionsDto);
    }
    async updateByUser(id, idd, updateMealDto) {
        updateMealDto.userId = id;
        return this.mealService.updateByUser(idd, updateMealDto);
    }
    async updateByAdmin(id, updateMealDto) {
        return this.mealService.updateByAdmin(id, updateMealDto);
    }
};
exports.MealController = MealController;
__decorate([
    (0, common_1.Post)('order'),
    (0, decorators_1.Roles)(enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_meal_dto_1.CreateMealDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/list'),
    (0, decorators_1.Roles)(enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pageOptionOrder_dto_1.PageOptionsDtoOrder]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "findAllUserMeal", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOptionOrder_dto_1.PageOptionsDtoOrder]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('update/order/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.STAFF, enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_meal_dto_1.UpdateMealDto]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "updateByUser", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_meal_dto_1.UpdateMealDto]),
    __metadata("design:returntype", Promise)
], MealController.prototype, "updateByAdmin", null);
exports.MealController = MealController = __decorate([
    (0, common_1.Controller)('meal'),
    (0, swagger_1.ApiTags)('mealOrder'),
    __metadata("design:paramtypes", [meal_service_1.MealService])
], MealController);
//# sourceMappingURL=meal.controller.js.map