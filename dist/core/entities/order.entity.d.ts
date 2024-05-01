import { AlphaModel } from './alpha-model';
import { User } from './user.entity';
import { STATUS } from 'core/enums';
export declare class Order extends AlphaModel {
    time: Date;
    status: STATUS;
    user?: User;
    userId?: number;
    mealPlan?: number;
    mealPlanId?: number;
}
