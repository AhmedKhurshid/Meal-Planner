import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PageOptionDto } from './dto/pageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { PageOptionsDtoInvoice } from 'feature/invoice/dto/pageOptionInvoice.dto';
export declare class VendorController {
    vendorService: VendorService;
    constructor(vendorService: VendorService);
    create(createVendorDto: CreateVendorDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAll(pageOption: PageOptionDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAllWithOutPagination(): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findOne(id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    update(id: number, updateVendorDto: UpdateVendorDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    changeLawyerStatus(body: ChangeStatusDto, id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findVendor(pageOptionsDto: PageOptionsDtoInvoice): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
}
