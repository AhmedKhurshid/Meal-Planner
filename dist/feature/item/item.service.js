"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../core/constant");
const service_1 = require("../../core/service");
const ResponseModel_1 = require("../../core/common/ResponseModel");
const enums_1 = require("../../core/enums");
const itemPageMeta_dto_1 = require("./dto/itemPageMeta.dto");
const vendor_entity_1 = require("../../core/entities/vendor.entity");
const typeorm_1 = require("typeorm");
let ItemService = class ItemService extends service_1.CoreService {
    async create(addItem) {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor.findOneBy({ id: addItem.vendorId });
        if (!vendor) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOVENDOR];
        }
        else {
            const name = await this.repos.item.findOneBy({ name: addItem.name });
            (0, constant_1.throwForbiddenExceptionServiceName)(name);
            const item = {
                name: addItem.name,
                type: addItem.type,
                quantity: addItem.quantity,
                costPrice: addItem.costPrice,
                markupPrice: addItem.markupPrice,
                image: addItem.image,
                userId: addItem.userId,
                vendorId: addItem.vendorId,
                status: addItem.status,
            };
            console.log(item.costPrice);
            console.log(item.markupPrice);
            const create = this.repos.item.create(item);
            await this.repos.item.save(create);
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NEWITEM];
        }
        return response;
    }
    async findAll(itemPageOption) {
        const response = new ResponseModel_1.ResponseData();
        const item = await this.repos.item
            .createQueryBuilder('item')
            .innerJoin(vendor_entity_1.Vendor, 'vendor', 'vendor.id = item.vendorId ')
            .where(`vendor.status = "${enums_1.VENDORSTATUS.ACTIVE}"`)
            .orWhere(new typeorm_1.Brackets((x) => {
            x.where('item.name LIKE :name', {
                name: `%${itemPageOption.seacrh}%`,
            }).orWhere('item.type LIKE :type', {
                type: `%${itemPageOption.seacrh}%`,
            });
        }))
            .select([
            'item.id as id',
            'item.name as name',
            'item.type as type',
            'item.quantity as quantity',
            'item.costPrice as costPrice',
            'item.markupPrice as markupPrice',
            'item.status as status',
            'item.image as image',
            'item.vendorId as vendorId',
            'vendor.id as vendorId',
            'vendor.status as vendor_status',
        ])
            .orderBy('item.createdAt', itemPageOption.order);
        const itemCount = await item.getCount();
        const entities = await item.getRawMany();
        const paginationDetail = new itemPageMeta_dto_1.ItemPageMeta({ itemCount, itemPageOption });
        const mainItem = entities.slice(itemPageOption.skip, itemPageOption.pageNo * itemPageOption.pageSize);
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        response.data = { paginationDetail, mainItem };
        return response;
    }
    async findWithoutPagintaion() {
        const response = new ResponseModel_1.ResponseData();
        const item = await this.repos.item.find();
        if (item.length == 0) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTFOUND];
            return response;
        }
        response.statusCode = common_1.HttpStatus.ACCEPTED;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        response.data = item;
        return response;
    }
    async findOne(id) {
        const response = new ResponseModel_1.ResponseData();
        const item = await this.repos.item.findOneBy({ id });
        if (!item) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTFOUND];
            return response;
        }
        response.statusCode = common_1.HttpStatus.ACCEPTED;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        response.data = item;
        return response;
    }
    async update(id, updateItem) {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor.findOneBy({
            id: updateItem.vendorId,
        });
        if (!vendor) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOVENDOR];
        }
        else {
            const item = await this.repos.item.findOneBy({ id: id });
            if (!item) {
                response.statusCode = common_1.HttpStatus.NOT_FOUND;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTFOUND];
                return response;
            }
            else {
                await this.repos.item.update(id, updateItem);
                response.statusCode = common_1.HttpStatus.OK;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
            }
        }
        return response;
    }
    async changeStatus({ status }, id) {
        const response = new ResponseModel_1.ResponseData();
        const item = await this.repos.item.findOneBy({ id: id });
        console.log(item);
        if (!item) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTFOUND];
        }
        else {
            try {
                await this.repos.item.update(id, { status });
                response.statusCode = common_1.HttpStatus.OK;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
            }
            catch (e) { }
        }
        return response;
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)()
], ItemService);
//# sourceMappingURL=item.service.js.map