import { ITEM } from 'core/enums';
export declare class CreateItemDto {
    name: string;
    type: string;
    quantity: string;
    status?: ITEM;
    costPrice: number;
    markupPrice: number;
    image: string;
    userId: number;
    vendorId: number;
}
declare const UpdateItemDto_base: import("@nestjs/common").Type<Partial<CreateItemDto>>;
export declare class UpdateItemDto extends UpdateItemDto_base {
}
export {};
