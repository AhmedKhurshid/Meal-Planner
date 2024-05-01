import { VENDORSTATUS } from 'core/enums';
export declare class CreateVendorDto {
    name: string;
    email: string;
    phone: string;
    status?: VENDORSTATUS;
    address?: string;
    paid?: number;
    balance?: number;
    total?: number;
}
declare const UpdateVendorDto_base: import("@nestjs/common").Type<Partial<CreateVendorDto>>;
export declare class UpdateVendorDto extends UpdateVendorDto_base {
}
export {};
