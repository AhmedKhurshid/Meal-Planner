import { AlphaModel } from "./alpha-model";
import { User } from "./user.entity";
import { STATUS } from "core/enums";
export declare class Meal extends AlphaModel {
    time: Date;
    status: STATUS;
    user?: User;
    userId?: number;
    item?: Meal;
    itemId?: number;
}
