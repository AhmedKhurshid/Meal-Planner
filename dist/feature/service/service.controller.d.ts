import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/create-service.dto';
import { CreateServiceFormDto } from './dto/createServiceForm.dto';
import { ContactUsDto } from './dto/createAboutUs.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(createServiceDto: CreateServiceDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAll(): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findOne(id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    createForm(body: CreateServiceFormDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    createAboutUs(body: ContactUsDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
}
