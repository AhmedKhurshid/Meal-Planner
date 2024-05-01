"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMealPlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_meal_plan_dto_1 = require("./create-meal-plan.dto");
class UpdateMealPlanDto extends (0, swagger_1.PartialType)(create_meal_plan_dto_1.CreateMealPlanDto) {
}
exports.UpdateMealPlanDto = UpdateMealPlanDto;
//# sourceMappingURL=update-meal-plan.dto.js.map