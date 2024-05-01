import { VENDORSTATUS } from 'core/enums';
export declare class CreateMealPlanDto {
    status?: VENDORSTATUS;
    item_id: number;
    meal_date: Date;
}
