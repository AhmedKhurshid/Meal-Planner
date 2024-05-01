import { AlphaModel } from './alpha-model';
import { Item } from './item.entity';
export declare class Vendor extends AlphaModel {
    name: string;
    email: string;
    phone: string;
    status: string;
    address: string;
    paid: number;
    balance: number;
    total: number;
    item?: Item;
}
