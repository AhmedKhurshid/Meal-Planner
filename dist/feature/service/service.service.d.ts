import { CreateServiceDto, UpdateServiceDto } from './dto/create-service.dto';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { CreateServiceFormDto } from './dto/createServiceForm.dto';
import { ContactUsDto } from './dto/createAboutUs.dto';
export declare class ServiceService extends CoreService {
    create(body: CreateServiceDto): Promise<ResponseData<unknown>>;
    createForm(body: CreateServiceFormDto): Promise<ResponseData<unknown>>;
    createContact(body: ContactUsDto): Promise<ResponseData<unknown>>;
    findAll(): Promise<ResponseData<unknown>>;
    findOne(id: number): Promise<ResponseData<unknown>>;
    update(id: number, body: UpdateServiceDto): Promise<ResponseData<unknown>>;
    remove(id: number): string;
}
