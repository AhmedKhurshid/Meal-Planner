import { GENDER, ROLE, STATUS } from 'core/enums';
export declare class UserReqFieldDto {
    email: string;
    status: STATUS;
    role: ROLE;
    name: string;
    gender: GENDER;
    phone: string;
    address: string;
    image?: string;
}
