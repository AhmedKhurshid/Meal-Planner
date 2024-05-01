import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { PageOptionsDtoOrder } from './dto/pageOptionOrder.dto';
export declare class MealService extends CoreService {
    create(createMealDto: CreateMealDto): Promise<ResponseData<unknown>>;
    findAllUserMeal({ id }: {
        id: any;
    }, pageOptionsDto: any): Promise<ResponseData<unknown>>;
    findAll(pageOptionsDto: PageOptionsDtoOrder): Promise<ResponseData<unknown>>;
    updateByAdmin(id: number, updateMeal: UpdateMealDto): Promise<ResponseData<unknown>>;
    updateByUser(idd: number, updateMeal: UpdateMealDto): Promise<ResponseData<unknown>>;
}
