"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../core/service");
const ResponseModel_1 = require("../../core/common/ResponseModel");
const enums_1 = require("../../core/enums");
const date_fns_1 = require("date-fns");
const mealPlan_entity_1 = require("../../core/entities/mealPlan.entity");
const item_entity_1 = require("../../core/entities/item.entity");
const entities_1 = require("../../core/entities");
const pageMeta_dto_1 = require("../../admin/dto/pageMeta.dto");
let MealService = class MealService extends service_1.CoreService {
    async create(createMealDto) {
        const res = new ResponseModel_1.ResponseData();
        const items = createMealDto.mealPlanId;
        const mealPlan1 = await this.repos.mealPlan.findOneBy({ id: items[0] });
        const mealPlan2 = await this.repos.mealPlan.findOneBy({ id: items[1] });
        if (!mealPlan1 || !mealPlan2) {
            res.statusCode = common_1.HttpStatus.NOT_FOUND;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.MEALPLANNOTFOUND];
            return res;
        }
        for (let index = 0; index < items.length; index++) {
            const itemId = items[index];
            const meal = await this.repos.order.findOneBy({ mealPlanId: itemId, userId: createMealDto.userId });
            if (meal) {
                res.statusCode = common_1.HttpStatus.FORBIDDEN;
                res.message = [enums_1.RESPOSE_CODE_MESSAGE.ALREADYORDERED];
                return res;
            }
            const mealOrder = {
                status: enums_1.STATUS.ACTIVE,
                userId: createMealDto.userId,
                mealPlanId: itemId,
                time: createMealDto.time || new Date(),
            };
            const create = this.repos.order.create(mealOrder);
            await this.repos.order.save(create);
        }
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ORDERED];
        return res;
    }
    async findAllUserMeal({ id }, pageOptionsDto) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ id });
        if (!user) {
            res.statusCode = common_1.HttpStatus.NOT_FOUND;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.USERNOTFOUND];
            return res;
        }
        const queryBuilder = this.repos.order.createQueryBuilder("order")
            .innerJoin(mealPlan_entity_1.MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(item_entity_1.Item, 's', 's.id = m.itemId')
            .innerJoin(entities_1.User, 'u', 'u.id = :userId', { userId: user === null || user === void 0 ? void 0 : user.id })
            .select([
            "order.status as status",
            "DATE_FORMAT(order.time, '%Y-%m-%d') as date",
            "order.id as id",
            "m.status as mealStatus",
            "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
            "s.name as itemName",
            "s.type as itemType",
            "u.id as userId",
        ])
            .where("u.role IN (:...roles) AND order.userId = :userId", {
            roles: [enums_1.ROLE.STUDENT, enums_1.ROLE.STAFF],
            userId: user === null || user === void 0 ? void 0 : user.id,
        });
        if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
            const entities = await queryBuilder.getRawMany();
            const datedata = [];
            for (let index = 0; index < entities.length; index++) {
                const element = entities[index];
                const startDate = pageOptionsDto.startDate;
                const endDate = pageOptionsDto.endDate;
                if (startDate <= element.date && endDate >= element.date) {
                    datedata.push(element);
                }
            }
            const meal = datedata.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
            const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount: datedata.length, pageOptionsDto });
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { meal, paginationDetail };
            return res;
        }
        queryBuilder
            .orderBy("order.createdAt", pageOptionsDto.order);
        const itemCount = await queryBuilder.getCount();
        const entities = await queryBuilder.getRawMany();
        const meal = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { meal, paginationDetail };
        return res;
    }
    async findAll(pageOptionsDto) {
        const res = new ResponseModel_1.ResponseData();
        if (pageOptionsDto.enable === true) {
            const date = new Date();
            const dateSplit = date.toISOString().split('T')[0];
            const queryBuilder = this.repos.order.createQueryBuilder("order")
                .innerJoin(mealPlan_entity_1.MealPlan, 'm', 'm.id = order.mealPlanId')
                .innerJoin(item_entity_1.Item, 's', 's.id = m.itemId')
                .innerJoin(entities_1.User, 'u', 'u.id = order.userId')
                .where("(u.role = :role AND (s.name LIKE :name OR u.gender = :gender) OR order.status = :status)", {
                role: enums_1.ROLE.STUDENT || enums_1.ROLE.STAFF,
                name: `%${pageOptionsDto.search}%`,
                gender: `${pageOptionsDto.search}`,
                status: pageOptionsDto.status,
            })
                .select([
                "order.status as status",
                "order.time as date",
                "m.status as mealStatus",
                "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
                "s.name as itemName",
                "s.type as itemType",
                "s.costPrice as costPrice",
                "s.markupPrice as markupPrice",
                "u.id as userId",
                "u.name as userName",
                "u.email as userEmail",
                "u.gender as gender",
            ]);
            const entities = await queryBuilder.getRawMany();
            const todayData = [];
            for (let index = 0; index < entities.length; index++) {
                const element = entities[index];
                const time = element.date.toISOString().split('T')[0];
                if (time == dateSplit) {
                    todayData.push(element);
                }
            }
            queryBuilder
                .orderBy("order.createdAt", pageOptionsDto.order);
            const itemCount = await queryBuilder.getCount();
            const meal = todayData.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
            const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount: todayData.length, pageOptionsDto });
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { meal, paginationDetail };
            return res;
        }
        console.log('fffff');
        const queryBuilder = this.repos.order.createQueryBuilder("order")
            .innerJoin(mealPlan_entity_1.MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(item_entity_1.Item, 's', 's.id = m.itemId')
            .innerJoin(entities_1.User, 'u', 'u.id = order.userId')
            .orWhere("(u.role = :role AND (s.name LIKE :name OR u.gender = :gender) OR order.status = :status)", {
            role: enums_1.ROLE.STUDENT || enums_1.ROLE.STAFF,
            name: `%${pageOptionsDto.search}%`,
            gender: `${pageOptionsDto.search}`,
            status: pageOptionsDto.status,
        })
            .select([
            "order.status as status",
            "order.time as date",
            "m.status as mealStatus",
            "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
            "s.name as itemName",
            "s.type as itemType",
            "s.costPrice as costPrice",
            "s.markupPrice as markupPrice",
            "u.id as userId",
            "u.name as userName",
            "u.email as userEmail",
            "u.gender as gender",
        ]);
        if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
            const entities = await queryBuilder.getRawMany();
            const datedata = [];
            for (let index = 0; index < entities.length; index++) {
                const element = entities[index];
                const timesSplit = element.date.toISOString().split('T')[0];
                const startDate = pageOptionsDto.startDate;
                const endDate = pageOptionsDto.endDate;
                if (startDate <= timesSplit && endDate >= timesSplit) {
                    datedata.push(element);
                }
            }
            const meal = datedata.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
            const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount: datedata.length, pageOptionsDto });
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { meal, paginationDetail };
            return res;
        }
        queryBuilder
            .orderBy("order.createdAt", pageOptionsDto.order);
        const itemCount = await queryBuilder.getCount();
        const entities = await queryBuilder.getRawMany();
        const meal = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { meal, paginationDetail };
        return res;
    }
    async updateByAdmin(id, updateMeal) {
        const response = new ResponseModel_1.ResponseData();
        const meal = await this.repos.order.findOneBy({ id: id });
        console.log("meal");
        console.log(meal);
        if (!meal) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
            return response;
        }
        const currentTime = new Date();
        const currentTimeTimestamp = currentTime.getTime();
        const mealTime = (0, date_fns_1.addHours)(meal.time, 2).getTime();
        if (currentTimeTimestamp > mealTime) {
            response.statusCode = common_1.HttpStatus.FORBIDDEN;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.ORDEREDTIMEOVER];
            return response;
        }
        await this.repos.order.update(id, { status: updateMeal.status });
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
        return response;
    }
    async updateByUser(idd, updateMeal) {
        const response = new ResponseModel_1.ResponseData();
        const meal = await this.repos.order.findOneBy({ id: idd, userId: updateMeal.userId });
        console.log("meal");
        console.log(meal);
        if (!meal) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
            return response;
        }
        const currentTime = new Date();
        const currentTimeTimestamp = currentTime.getTime();
        const mealTime = (0, date_fns_1.addHours)(meal.time, 2).getTime();
        if (currentTimeTimestamp > mealTime) {
            response.statusCode = common_1.HttpStatus.FORBIDDEN;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.ORDEREDTIMEOVER];
            return response;
        }
        await this.repos.order.update(idd, { status: updateMeal.status });
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
        return response;
    }
};
exports.MealService = MealService;
exports.MealService = MealService = __decorate([
    (0, common_1.Injectable)()
], MealService);
//# sourceMappingURL=meal.service.js.map