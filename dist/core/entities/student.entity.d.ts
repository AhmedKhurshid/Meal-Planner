import { AlphaModel } from './alpha-model';
import { User } from './user.entity';
export declare class Student extends AlphaModel {
    secPhone?: string;
    allergies?: string;
    user?: User;
    userId?: number;
    type?: number;
    typeId?: number;
}
