"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../core/service");
const constant_1 = require("../../core/constant");
const ResponseModel_1 = require("../../core/common/ResponseModel");
const enums_1 = require("../../core/enums");
let ServiceService = class ServiceService extends service_1.CoreService {
    async create(body) {
        const name = await this.repos.service.findOneBy({ name: body.name });
        (0, constant_1.throwForbiddenExceptionServiceName)(name);
        const service = {
            name: body.name,
            image: body.image,
            type: body.type
        };
        const create = this.repos.service.create(service);
        await this.repos.service.save(create);
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        return res;
    }
    async createForm(body) {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.service.findOneBy({ id: body.serviceId });
        if (!service) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
            return res;
        }
        const serviceForm = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            type: body.type,
            mobile: body.mobile,
            serviceId: body.serviceId,
            date: body.date,
            time: body.time,
        };
        const create = this.repos.serviceForm.create(serviceForm);
        await this.repos.serviceForm.save(create);
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        return res;
    }
    async createContact(body) {
        const res = new ResponseModel_1.ResponseData();
        await this.mail.contactUs({
            to: constant_1.ENV.MAIL_FROM,
            subject: body.subject,
            name: body.name,
            email: body.email,
            message: body.message
        });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        return res;
    }
    async findAll() {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.service.find();
        if (service.length == 0) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
            return res;
        }
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = service;
        return res;
    }
    async findOne(id) {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.service.findOneBy({ id });
        if (!service) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
            return res;
        }
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = service;
        return res;
    }
    async update(id, body) {
        const res = new ResponseModel_1.ResponseData();
        const service = await this.repos.service.findOneBy({ id });
        if (!service) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
            return res;
        }
        await this.repos.service.update(id, body);
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
        return res;
    }
    remove(id) {
        return `This action removes a #${id} service`;
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)()
], ServiceService);
//# sourceMappingURL=service.service.js.map