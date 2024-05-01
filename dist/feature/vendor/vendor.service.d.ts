import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { PageOptionDto } from './dto/pageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { PageOptionsDtoInvoice } from 'feature/invoice/dto/pageOptionInvoice.dto';
export declare class VendorService extends CoreService {
    create(body: CreateVendorDto): Promise<ResponseData<unknown>>;
    findAll(pageOption: PageOptionDto): Promise<ResponseData<unknown>>;
    findOne(id: number): Promise<ResponseData<unknown>>;
    findAllWithOutPagination(): Promise<ResponseData<unknown>>;
    update(id: number, body: UpdateVendorDto): Promise<ResponseData<unknown>>;
    changeStatus({ status }: ChangeStatusDto, id: number): Promise<ResponseData<unknown>>;
    findVendor(pageOptionsDto: PageOptionsDtoInvoice): Promise<ResponseData<unknown>>;
}
