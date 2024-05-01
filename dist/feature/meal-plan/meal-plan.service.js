"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanService = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../core/service");
const ResponseModel_1 = require("../../core/common/ResponseModel");
const enums_1 = require("../../core/enums");
const item_entity_1 = require("../../core/entities/item.entity");
const itemPageMeta_dto_1 = require("./dto/itemPageMeta.dto");
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("../../core/entities/vendor.entity");
let MealPlanService = class MealPlanService extends service_1.CoreService {
    async create(itemPageOption) {
        const response = new ResponseModel_1.ResponseData();
        const date = new Date();
        const isoFormat = date.toISOString().split('T')[0];
        const inputDate = itemPageOption.meal_date;
        if (inputDate.toString() >= isoFormat) {
            const item = await this.repos.item.findOneBy({
                id: itemPageOption.item_id,
            });
            if (!item) {
                response.statusCode = common_1.HttpStatus.BAD_REQUEST;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTFOUND];
            }
            else {
                await this.repos.mealPlan.findOneBy({
                    status: itemPageOption.status,
                });
                const Plan = {
                    status: itemPageOption.status,
                    itemId: itemPageOption.item_id,
                    meal_date: itemPageOption.meal_date,
                };
                const create = this.repos.mealPlan.create(Plan);
                await this.repos.mealPlan.save(create);
                response.statusCode = common_1.HttpStatus.OK;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.NEWMEALPLAN];
            }
        }
        else {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.DATEERROR];
        }
        return response;
    }
    async findWithoutPagination() {
        const mealPlan = await this.repos.mealPlan
            .createQueryBuilder('meal_plan')
            .innerJoin(item_entity_1.Item, 'item', 'item.id = meal_plan.itemId')
            .innerJoin(vendor_entity_1.Vendor, 'vendor', 'vendor.id = item.vendorId')
            .select([
            'meal_plan.id as id',
            'meal_plan.status as status',
            "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate",
            'item.id as item_id',
            'item.name as name',
            'item.type as type',
            'item.quantity as quantity',
            'item.costPrice as costPrice',
            'item.markupPrice as markupPrice',
            'item.image as image',
            'vendor.name as vendorName',
        ])
            .where('meal_plan.itemId = item.id')
            .andWhere("meal_plan.status = 'Active'")
            .getRawMany();
        const response = new ResponseModel_1.ResponseData();
        if (!mealPlan) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
        response.data = mealPlan;
        return response;
    }
    async currentDate() {
        const date = new Date();
        const isoFormat = date.toISOString().split('T')[0];
        const mealPlan = await this.repos.mealPlan
            .createQueryBuilder('meal_plan')
            .innerJoin(item_entity_1.Item, 'item', 'item.id = meal_plan.itemId')
            .innerJoin(vendor_entity_1.Vendor, 'vendor', 'vendor.id = item.vendorId')
            .select([
            'meal_plan.id as id',
            'meal_plan.status as status',
            "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate",
            'item.id as item_id',
            'item.name as name',
            'item.type as type',
            'item.quantity as quantity',
            'item.costPrice as costPrice',
            'item.markupPrice as markupPrice',
            'item.image as image',
            'vendor.name as vendorName',
        ])
            .where(`meal_plan.meal_date = "${isoFormat}"`)
            .andWhere('meal_plan.itemId = item.id')
            .orderBy()
            .getRawMany();
        const response = new ResponseModel_1.ResponseData();
        if (!mealPlan) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        else if (mealPlan.length == 0) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        else {
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
            response.data = mealPlan;
        }
        return response;
    }
    async findAll(itemPageOption) {
        const mealPlan = await this.repos.mealPlan
            .createQueryBuilder('meal_plan')
            .innerJoin(item_entity_1.Item, 'item', 'item.id = meal_plan.itemId')
            .innerJoin(vendor_entity_1.Vendor, 'vendor', 'vendor.id = item.vendorId')
            .where(`meal_plan.status ='${itemPageOption.status}'`)
            .andWhere(new typeorm_1.Brackets((x) => {
            x.where('meal_plan.meal_date LIKE :datesearch', {
                datesearch: `%${itemPageOption.dateSearch}%`,
            });
        }))
            .select([
            'meal_plan.id as id',
            'meal_plan.status as status',
            "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate",
            'item.id as item_id',
            'item.name as name',
            'item.type as type',
            'item.quantity as quantity',
            'item.costPrice as costPrice',
            'item.markupPrice as markupPrice',
            'item.image as image',
            'vendor.name as vendorName',
        ])
            .orderBy('meal_plan.meal_date', itemPageOption.order);
        const itemCount = await mealPlan.getCount();
        const entities = await mealPlan.getRawMany();
        const paginationDetail = new itemPageMeta_dto_1.ItemPageMeta({ itemCount, itemPageOption });
        const mainItem = entities.slice(itemPageOption.skip, itemPageOption.pageNo * itemPageOption.pageSize);
        const response = new ResponseModel_1.ResponseData();
        if (!entities) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        else if (entities.length == 0) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        else {
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
            response.data = { paginationDetail, mainItem };
        }
        return response;
    }
    async findOne(id) {
        const mealPlan = await this.repos.mealPlan
            .createQueryBuilder('meal_plan')
            .innerJoin(item_entity_1.Item, 'item', 'item.id = meal_plan.itemId')
            .select([
            'meal_plan.id as id',
            'meal_plan.status as status',
            "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate",
            'item.id as item_id',
            'item.name as name',
            'item.type as type',
            'item.quantity as quantity',
            'item.costPrice as costPrice',
            'item.markupPrice as markupPrice',
            'item.image as image',
        ])
            .where('meal_plan.itemId = item.id')
            .andWhere(`meal_plan.id = ${id}`);
        const entities = await mealPlan.getRawMany();
        const response = new ResponseModel_1.ResponseData();
        if (entities.length == 0) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        else {
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
            response.data = entities;
        }
        return response;
    }
    async update(id, data) {
        const item = await this.repos.item.findOneBy({ id: data.item_id });
        const response = new ResponseModel_1.ResponseData();
        console.log(item);
        if (!item) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTFOUND];
        }
        else {
            const mealPlan = await this.repos.mealPlan.findOneBy({ id: id });
            console.log(mealPlan);
            if (!mealPlan) {
                response.statusCode = common_1.HttpStatus.BAD_REQUEST;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
            }
            else {
                await this.repos.mealPlan.update(id, {
                    status: data.status,
                    meal_date: data.meal_date,
                    itemId: data.item_id,
                });
                response.statusCode = common_1.HttpStatus.OK;
                response.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANUPDATED];
            }
        }
        return response;
    }
    async updateStatus({ status }, id) {
        const mealPlan = await this.repos.mealPlan.findOneBy({ id: id });
        const response = new ResponseModel_1.ResponseData();
        if (!mealPlan) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
        }
        else {
            await this.repos.mealPlan.update(id, { status });
            response.statusCode = common_1.HttpStatus.OK;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANUPDATED];
        }
        return response;
    }
};
exports.MealPlanService = MealPlanService;
exports.MealPlanService = MealPlanService = __decorate([
    (0, common_1.Injectable)()
], MealPlanService);
//# sourceMappingURL=meal-plan.service.js.map