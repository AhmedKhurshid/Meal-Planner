import { Service } from "./service.entity";
import { AlphaModel } from "./alpha-model";
export declare class ServiceForm extends AlphaModel {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    type: string;
    date: Date;
    time: Date;
    service?: Service;
    serviceId?: number;
}
