import { ServiceForm } from './serviceForm.entity';
export declare class Service {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    image: string;
    type: string[];
    serviceForm?: ServiceForm[];
}
