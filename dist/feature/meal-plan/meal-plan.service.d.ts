import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
export declare class MealPlanService extends CoreService {
    create(itemPageOption: CreateMealPlanDto): Promise<ResponseData<unknown>>;
    findWithoutPagination(): Promise<ResponseData<unknown>>;
    currentDate(): Promise<ResponseData<unknown>>;
    findAll(itemPageOption: ItemPageOptionDto): Promise<ResponseData<unknown>>;
    findOne(id: number): Promise<ResponseData<unknown>>;
    update(id: number, data: UpdateMealPlanDto): Promise<ResponseData<unknown>>;
    updateStatus({ status }: ChangeStatusDto, id: number): Promise<ResponseData<unknown>>;
}
