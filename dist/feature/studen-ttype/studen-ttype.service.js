"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudenTtypeService = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../core/service");
const constant_1 = require("../../core/constant");
const ResponseModel_1 = require("../../core/common/ResponseModel");
const enums_1 = require("../../core/enums");
const pageMeta_dto_1 = require("../../admin/dto/pageMeta.dto");
let StudenTtypeService = class StudenTtypeService extends service_1.CoreService {
    async create(body) {
        const name = await this.repos.type.findOneBy({ name: body.name });
        (0, constant_1.throwForbiddenExceptionServiceName)(name);
        const studentType = {
            name: body.name
        };
        const create = this.repos.type.create(studentType);
        await this.repos.type.save(create);
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        return res;
    }
    async findAll() {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.type.find();
        if (service.length == 0) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
            return res;
        }
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = service;
        return res;
    }
    async findOne(id) {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.type.findOneBy({ id });
        if (!service) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
            return res;
        }
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = service;
        return res;
    }
    async update(id, body) {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.type.findOneBy({ id });
        if (!service) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
            return res;
        }
        await this.repos.type.update(id, body);
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
        return res;
    }
    async remove(id) {
        const response = new ResponseModel_1.ResponseData();
        const vendor = await this.repos.type.findOneBy({ id });
        const user = await this.repos.student.findOneBy({ typeId: id });
        if (!vendor) {
            response.statusCode = common_1.HttpStatus.NOT_FOUND;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
            return response;
        }
        if (user) {
            response.statusCode = common_1.HttpStatus.BAD_REQUEST;
            response.message = [enums_1.RESPOSE_CODE_MESSAGE.TYPEUSEDINSTUDENT];
            return response;
        }
        response.statusCode = common_1.HttpStatus.OK;
        response.message = [enums_1.RESPOSE_CODE_MESSAGE.DELETE];
        await this.repos.type.delete({ id });
        return response;
    }
    async getNotificationList(pageOptionsDto) {
        const queryBuilder = await this.repos.type.createQueryBuilder("type")
            .where("(type.name LIKE :name)", { name: `%${pageOptionsDto.search}%` })
            .select([
            'type.id as id',
            'type.name as name'
        ]);
        queryBuilder.orderBy('type.createdAt', pageOptionsDto.order);
        const res = new ResponseModel_1.ResponseData();
        const itemCount = await queryBuilder.getCount();
        const type = await queryBuilder.getRawMany();
        console.log(pageOptionsDto.enable);
        if (pageOptionsDto.enable == true) {
            console.log('reched');
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { type };
            return res;
        }
        console.log('ssd');
        const types = type.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { types, paginationDetail };
        return res;
    }
};
exports.StudenTtypeService = StudenTtypeService;
exports.StudenTtypeService = StudenTtypeService = __decorate([
    (0, common_1.Injectable)()
], StudenTtypeService);
//# sourceMappingURL=studen-ttype.service.js.map