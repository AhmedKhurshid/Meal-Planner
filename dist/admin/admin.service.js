"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../core/enums");
const service_1 = require("../core/service");
const ResponseModel_1 = require("../core/common/ResponseModel");
const constant_1 = require("../core/constant");
const pageMeta_dto_1 = require("./dto/pageMeta.dto");
const service_entity_1 = require("../core/entities/service.entity");
let AdminService = class AdminService extends service_1.CoreService {
    constructor() {
        super(...arguments);
        this.userSelectiveColumns = {
            name: true,
            email: true,
            gender: true,
            phone: true,
            image: true,
            role: true,
            status: true,
        };
    }
    async changeStatusUser({ status }, id) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({ id });
        (0, constant_1.throwForbiddenExceptionUser)(user);
        try {
            await this.repos.user.update(id, { status });
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
            return res;
        }
        catch (e) { }
    }
    async updateStudentInfo(data, id) {
        const res = new ResponseModel_1.ResponseData();
        const existUser = await this.repos.user.findOneBy({ id });
        (0, constant_1.throwForbiddenExceptionUser)(existUser);
        try {
            if (existUser) {
                await this.repos.user.update(id, {
                    name: data.name,
                    gender: data.gender,
                    phone: data.phone,
                    address: data.address,
                    image: data.image,
                });
                await this.repos.student.update(id, {
                    secPhone: data.secPhone,
                    allergies: data.allergies,
                    typeId: data.type,
                });
                res.statusCode = common_1.HttpStatus.OK;
                res.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
                return res;
            }
            else {
                res.statusCode = common_1.HttpStatus.NOT_FOUND;
                res.message = [enums_1.RESPOSE_CODE_MESSAGE.USERNOTFOUND];
                return res;
            }
        }
        catch (e) { }
    }
    async getLawyers() {
        const res = new ResponseModel_1.ResponseData();
        const lawyer = await this.repos.user.find({
            where: { role: enums_1.ROLE.STUDENT },
            select: this.userSelectiveColumns,
        });
        if (lawyer.length == 0) {
            res.statusCode = common_1.HttpStatus.BAD_REQUEST;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.LAWYERREQUEST];
            return res;
        }
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = lawyer;
        return res;
    }
    async getLawyer(id) {
        const res = new ResponseModel_1.ResponseData();
        const user = await this.repos.user.findOneBy({
            id,
            role: enums_1.ROLE.STUDENT || enums_1.ROLE.STAFF,
        });
        const student = await this.repos.student.findOneBy({
            userId: id,
        });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { user, student };
        return res;
    }
    async signUpLawyer(data) {
        const res = new ResponseModel_1.ResponseData();
        const existUser = await this.repos.user.findOneBy({ email: data.email });
        (0, constant_1.throwForbiddenException)(existUser);
        const user = (0, constant_1.searalizeUser)(data, enums_1.ROLE.STUDENT, enums_1.STATUS.ACTIVE);
        const password = 'KLP' + (await (0, constant_1.generateLawyerPassword)());
        console.log('password', password);
        const hashResult = await constant_1.argon.hash(password);
        user.password = hashResult;
        try {
            const createUser = this.repos.user.create(user);
            const userId = await this.repos.user.save(createUser);
            const { email, id, name } = user;
            const result = { id, email, name };
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.REGISTERSUCCESSFULL];
            res.data = result;
            return res;
        }
        catch (e) {
        }
    }
    async getLawyerList(pageOptionsDto) {
        const queryBuilder = await this.repos.user
            .createQueryBuilder('user')
            .where('user.role =:role AND ((user.email LIKE :email OR user.name LIKE :name OR  user.mobile LIKE :mobile) AND user.status =:status)', {
            role: enums_1.ROLE.STUDENT,
            email: `%${pageOptionsDto.search}%`,
            name: `%${pageOptionsDto.search}%`,
            phone: `%${pageOptionsDto.search}%`,
            status: pageOptionsDto.status,
        })
            .select([
            'user.id as id',
            'user.name as name',
            'user.email as email',
            'user.status as status',
            'user.role as role',
            'user.gender as gender',
            'user.address as address',
            'user.city as city',
            'user.phone as phone',
            'user.image as image',
            'user.location as location',
        ]);
        queryBuilder.orderBy('user.createdAt', pageOptionsDto.order);
        const itemCount = await queryBuilder.getCount();
        const entities = await queryBuilder.getRawMany();
        const lawyer = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { lawyer, paginationDetail };
        return res;
    }
    async getServiceFormList(pageOptionsDto) {
        const queryBuilder = this.repos.serviceForm
            .createQueryBuilder('serviceForm')
            .innerJoin(service_entity_1.Service, 's', 's.id = serviceForm.serviceId')
            .where('(serviceForm.city LIKE :city OR serviceForm.firstName LIKE :firstName OR serviceForm.lastName LIKE :lastName OR serviceForm.phone LIKE :phone OR serviceForm.email LIKE :email OR serviceForm.type LIKE :type OR s.name LIKE :name)', {
            firstName: `%${pageOptionsDto.search}%`,
            city: `%${pageOptionsDto.search}%`,
            lastName: `%${pageOptionsDto.search}%`,
            phone: `%${pageOptionsDto.search}%`,
            email: `%${pageOptionsDto.search}%`,
            type: `%${pageOptionsDto.search}%`,
            name: `%${pageOptionsDto.search}%`,
        })
            .select([
            'serviceForm.id as id',
            'serviceForm.email as email',
            'serviceForm.firstName as firstName',
            'serviceForm.lastName as lastName',
            'serviceForm.city as city',
            'serviceForm.phone as phone',
            'serviceForm.type as type',
            'serviceForm.desc as description',
            "DATE_FORMAT(serviceForm.date,'%Y-%m-%d') as date",
            'serviceForm.time as time',
            's.id as serviceId',
            's.name as serviceName',
        ]);
        queryBuilder.orderBy('serviceForm.id', pageOptionsDto.order);
        const itemCount = await queryBuilder.getCount();
        const entities = await queryBuilder.getRawMany();
        const serviceForm = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { serviceForm, paginationDetail };
        return res;
    }
    async createNotification(body) {
        const existName = await this.repos.notification.findOneBy({
            title: body.title,
        });
        (0, constant_1.throwForbiddenExceptionName)(existName);
        const notif = {
            title: body.title,
        };
        const create = this.repos.notification.create(notif);
        await this.repos.notification.save(create);
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        return res;
    }
    async deleteNotification(id) {
        const res = new ResponseModel_1.ResponseData();
        const exist = await this.repos.notification.findOneBy({ id: id });
        if (!exist) {
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.NOTIFICATION];
            return res;
        }
        await this.repos.notification.delete(id);
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.DELETE];
        return res;
    }
    async getNotificationList(pageOptionsDto) {
        const queryBuilder = await this.repos.notification
            .createQueryBuilder('notification')
            .where('(notification.title LIKE :title)', {
            title: `%${pageOptionsDto.search}%`,
        })
            .select([
            'notification.id as id',
            'notification.title as title',
            'notification.desc as description',
        ]);
        queryBuilder.orderBy('notification.createdAt', pageOptionsDto.order);
        const res = new ResponseModel_1.ResponseData();
        const itemCount = await queryBuilder.getCount();
        const notification = await queryBuilder.getRawMany();
        console.log(pageOptionsDto.enable);
        if (pageOptionsDto.enable == true) {
            console.log('reched');
            res.statusCode = common_1.HttpStatus.OK;
            res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
            res.data = { notification };
            return res;
        }
        console.log('ssd');
        const notifications = notification.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);
        const paginationDetail = new pageMeta_dto_1.PageMetaDto({ itemCount, pageOptionsDto });
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.ACCEPT];
        res.data = { notifications, paginationDetail };
        return res;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map