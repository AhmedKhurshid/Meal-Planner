import { GENDER } from "core/enums";
export declare class AdminLawyerDto {
    email: string;
    name: string;
    gender: GENDER;
    phone: string;
    address: string;
    image?: string;
    location?: string;
}
