import { MealService } from './meal.service';
import { CreateMealDto, UpdateMealDto } from './dto/create-meal.dto';
import { PageOptionsDtoOrder } from './dto/pageOptionOrder.dto';
export declare class MealController {
    mealService: MealService;
    constructor(mealService: MealService);
    create(id: number, createMealDto: CreateMealDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAllUserMeal(id: number, pageOptionsDto: PageOptionsDtoOrder): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAll(pageOptionsDto: PageOptionsDtoOrder): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    updateByUser(id: number, idd: number, updateMealDto: UpdateMealDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    updateByAdmin(id: number, updateMealDto: UpdateMealDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
}
