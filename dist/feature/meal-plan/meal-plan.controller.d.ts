import { MealPlanService } from './meal-plan.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
export declare class MealPlanController {
    mealPlanService: MealPlanService;
    constructor(mealPlanService: MealPlanService);
    create(createMealPlanDto: CreateMealPlanDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findWithoutPagination(): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    currentDate(): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAll(body: ItemPageOptionDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findOne(id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    update(id: number, updateMealPlanDto: UpdateMealPlanDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    changeStatus(updateStatus: ChangeStatusDto, id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
}
