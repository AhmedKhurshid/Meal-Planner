import { GENDER, ROLE } from 'core/enums';
export type UserInfo = {
    id: number;
    name: string;
    email: string;
    role: ROLE;
    mobile: string;
    gender: GENDER;
    city: string;
    address: string;
    image: string;
};
