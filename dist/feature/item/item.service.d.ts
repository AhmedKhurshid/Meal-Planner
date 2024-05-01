import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
export declare class ItemService extends CoreService {
    create(addItem: CreateItemDto): Promise<ResponseData<unknown>>;
    findAll(itemPageOption: ItemPageOptionDto): Promise<ResponseData<unknown>>;
    findWithoutPagintaion(): Promise<ResponseData<unknown>>;
    findOne(id: number): Promise<ResponseData<unknown>>;
    update(id: number, updateItem: UpdateItemDto): Promise<ResponseData<unknown>>;
    changeStatus({ status }: ChangeStatusDto, id: number): Promise<ResponseData<unknown>>;
}
