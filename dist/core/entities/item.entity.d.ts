import { AlphaModel } from './alpha-model';
import { User } from './user.entity';
import { MealPlan } from './mealPlan.entity';
import { Vendor } from './vendor.entity';
import { ITEM } from 'core/enums';
export declare class Item extends AlphaModel {
    name: string;
    type: string;
    quantity: string;
    costPrice: number;
    markupPrice: number;
    status?: ITEM;
    image?: string;
    user?: User;
    userId?: number;
    item?: MealPlan;
    vendor?: Vendor;
    vendorId?: number;
}
