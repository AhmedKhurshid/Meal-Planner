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
exports.MealPlanController = void 0;
const common_1 = require("@nestjs/common");
const meal_plan_service_1 = require("./meal-plan.service");
const create_meal_plan_dto_1 = require("./dto/create-meal-plan.dto");
const update_meal_plan_dto_1 = require("./dto/update-meal-plan.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../core/decorators");
const enums_1 = require("../../core/enums");
const itemPageOption_dto_1 = require("./dto/itemPageOption.dto");
const change_status_dto_1 = require("./dto/change-status.dto");
const testing_1 = require("../../core/common/testing");
const mealPlan_detail_dto_1 = require("./ResponseModel/mealPlan-detail.dto");
let MealPlanController = class MealPlanController {
    constructor(mealPlanService) {
        this.mealPlanService = mealPlanService;
    }
    async create(createMealPlanDto) {
        return await this.mealPlanService.create(createMealPlanDto);
    }
    async findWithoutPagination() {
        return await this.mealPlanService.findWithoutPagination();
    }
    async currentDate() {
        return await this.mealPlanService.currentDate();
    }
    async findAll(body) {
        return await this.mealPlanService.findAll(body);
    }
    async findOne(id) {
        return await this.mealPlanService.findOne(id);
    }
    async update(id, updateMealPlanDto) {
        return await this.mealPlanService.update(id, updateMealPlanDto);
    }
    async changeStatus(updateStatus, id) {
        return await this.mealPlanService.updateStatus(updateStatus, id);
    }
};
exports.MealPlanController = MealPlanController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, testing_1.ApiResponseBody)(mealPlan_detail_dto_1.MealPlan),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_plan_dto_1.CreateMealPlanDto]),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('lists'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "findWithoutPagination", null);
__decorate([
    (0, common_1.Get)('currentDate'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "currentDate", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [itemPageOption_dto_1.ItemPageOptionDto]),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('list/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_meal_plan_dto_1.UpdateMealPlanDto]),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('changeStatus/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_status_dto_1.ChangeStatusDto, Number]),
    __metadata("design:returntype", Promise)
], MealPlanController.prototype, "changeStatus", null);
exports.MealPlanController = MealPlanController = __decorate([
    (0, common_1.Controller)('meal-plan'),
    (0, swagger_1.ApiTags)('meal-plan'),
    __metadata("design:paramtypes", [meal_plan_service_1.MealPlanService])
], MealPlanController);
//# sourceMappingURL=meal-plan.controller.js.map