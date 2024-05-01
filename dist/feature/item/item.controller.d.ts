import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(createItemDto: CreateItemDto, id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findAll(pageOptionItemDto: ItemPageOptionDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findWithoutPagintaion(): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    findOne(id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    update(id: number, updateItemDto: UpdateItemDto): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
    changeStatus(body: ChangeStatusDto, id: number): Promise<import("../../core/common/ResponseModel").ResponseData<unknown>>;
}
