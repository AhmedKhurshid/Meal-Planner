import { AlphaModel } from './alpha-model';
import { VENDORSTATUS } from 'core/enums';
import { Item } from './item.entity';
import { Order } from './order.entity';
export declare class MealPlan extends AlphaModel {
    status: VENDORSTATUS;
    meal_date: Date;
    item?: Item;
    itemId?: number;
    mealPlan?: Order[];
}
