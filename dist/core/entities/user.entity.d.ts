import { GENDER, ROLE, STATUS } from 'core/enums';
import { AlphaModel } from './alpha-model';
import { Student } from './student.entity';
import { Item } from './item.entity';
import { Order } from './order.entity';
export declare class User extends AlphaModel {
    name: string;
    email: string;
    status: STATUS;
    role: ROLE;
    password: string;
    forgetPasswordToken?: string;
    phone: string;
    gender: GENDER;
    address: string;
    image?: string;
    hashedRt?: string;
    students?: Student[];
    item?: Item[];
    userOrder?: Order[];
}
