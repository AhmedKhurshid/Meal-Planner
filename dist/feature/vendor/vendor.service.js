"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../core/service");
const constant_1 = require("../../core/constant");
const vendor_entity_1 = require("../../core/entities/vendor.entity");
const ResponseModel_1 = require("../../core/common/ResponseModel");
const enums_1 = require("../../core/enums");
const pageMeta_dto_1 = require("./dto/pageMeta.dto");
const mealPlan_entity_1 = require("../../core/entities/mealPlan.entity");
const item_entity_1 = require("../../core/entities/item.entity");
let VendorService = class VendorService extends service_1.CoreService {
    async create(body) {
        const email = await this.repos.vendor.findOneBy({
            email: body.email,
        });
        (0, constant_1.throwForbiddenExceptionServiceName)(email);
        const vendor = {
            name: body.name,
            email: body.email,
            address: body.address,
            status: enums_1.VENDORSTATUS.ACTIVE,
            phone: body.phone,
            balance: body.balance,
            paid: body.paid,
            total: body.total,
        };
        const create = this.repos.vendor.create(vendor);
        await this.repos.vendor.save(create);
        const response = new ResponseModel_1.ResponseData();
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.NEWVENDOR];
        response.data = vendor;
        return response;
    }
    async findAll(pageOption) {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor
            .createQueryBuilder('vendor')
            .where(`vendor.status = "${enums_1.VENDORSTATUS.ACTIVE}"`)
            .orWhere('vendor.phone LIKE :phone', {
            phone: `%${pageOption.search}%`,
        })
            .orWhere('vendor.email LIKE :email', {
            email: `%${pageOption.search}%`,
        })
            .orWhere('vendor.name LIKE :name', {
            name: `%${pageOption.search}%`,
        })
            .select([
            'vendor.id as id',
            'vendor.name as name',
            'vendor.email as email',
            'vendor.phone as phone',
            'vendor.status as status',
            'vendor.address as address',
            'vendor.paid as paid',
            'vendor.balance as balance',
            'vendor.total as total',
        ])
            .orderBy('vendor.createdAt', pageOption.order);
        const itemCount = await vendor.getCount();
        const entities = await vendor.getRawMany();
        const mainVendor = entities.slice(pageOption.skip, pageOption.pageNo * pageOption.pageSize);
        const paginationDetail = new pageMeta_dto_1.PageMeta({ itemCount, pageOption });
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.VENDORFOUND];
        response.data = { paginationDetail, mainVendor };
        return response;
    }
    async findOne(id) {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor.findOneBy({ id });
        if (!vendor) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOVENDOR];
            return response;
        }
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.VENDORFOUND];
        response.data = vendor;
        return response;
    }
    async findAllWithOutPagination() {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor.find();
        if (!vendor) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOVENDOR];
            return response;
        }
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.VENDORFOUND];
        response.data = vendor;
        return response;
    }
    async update(id, body) {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor.findOneBy({ id: id });
        if (!vendor) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOVENDOR];
            return response;
        }
        else {
            await this.repos.vendor.update(id, body);
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.VENDORUPDATED];
        }
        return response;
    }
    async changeStatus({ status }, id) {
        const res = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.vendor.findOneBy({ id: id });
        if (!vendor) {
            res.statusCode = common_1.HttpStatus.NOT_FOUND;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.NOVENDOR];
            return res;
        }
        else {
            try {
                await this.repos.vendor.update(id, { status });
                res.statusCode = common_1.HttpStatus.OK;
                res.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
                return res;
            }
            catch (e) { }
        }
    }
    async findVendor(pageOptionsDto) {
        const queryBuilder = this.repos.order
            .createQueryBuilder('order')
            .innerJoin(mealPlan_entity_1.MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(item_entity_1.Item, 's', 's.id = m.itemId')
            .innerJoin(vendor_entity_1.Vendor, 'v', 'v.id = s.vendorId')
            .where(`order.status = "${enums_1.STATUS.ACTIVE}" AND m.status = "${enums_1.STATUS.ACTIVE}"`)
            .select([
            "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
            's.name as itemName',
            's.type as itemType',
            's.quantity as quantity',
            's.costPrice as costPrice',
            's.markupPrice as markupPrice',
            'v.id as vendorId',
            'v.name as vendorName',
            'v.email as vendorEmail',
            'v.phone as vendorPhone',
            'v.address as vendorAddress',
            'v.paid as vendorPaid',
            'v.balance as vendorBalance',
            'v.total as vendorTotal',
        ]);
        if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
            const entities = await queryBuilder.getRawMany();
            const datedata = [];
            for (let index = 0; index < entities.length; index++) {
                const element = entities[index];
                const startDate = pageOptionsDto.startDate;
                const endDate = pageOptionsDto.endDate;
                if (startDate <= element.mealDate && endDate >= element.mealDate) {
                    datedata.push(element);
                    console.log('element.mealDate');
                }
            }
            const response = new ResponseModel_1.ResponseData();
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.VENDORFOUND];
            response.data = datedata;
            return response;
        }
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)()
], VendorService);
//# sourceMappingURL=vendor.service.js.map