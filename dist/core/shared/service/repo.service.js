"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../entities");
const item_entity_1 = require("../../entities/item.entity");
const order_entity_1 = require("../../entities/order.entity");
const notification_entity_1 = require("../../entities/notification.entity");
const service_entity_1 = require("../../entities/service.entity");
const serviceForm_entity_1 = require("../../entities/serviceForm.entity");
const student_entity_1 = require("../../entities/student.entity");
const vendor_entity_1 = require("../../entities/vendor.entity");
const typeorm_2 = require("typeorm");
const mealPlan_entity_1 = require("../../entities/mealPlan.entity");
const studentType_entity_1 = require("../../entities/studentType.entity");
let RepoService = class RepoService {
    constructor(datasource, user, service, serviceForm, notification, student, item, vendor, mealPlan, order, type) {
        this.datasource = datasource;
        this.user = user;
        this.service = service;
        this.serviceForm = serviceForm;
        this.notification = notification;
        this.student = student;
        this.item = item;
        this.vendor = vendor;
        this.mealPlan = mealPlan;
        this.order = order;
        this.type = type;
    }
};
exports.RepoService = RepoService;
exports.RepoService = RepoService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(3, (0, typeorm_1.InjectRepository)(serviceForm_entity_1.ServiceForm)),
    __param(4, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(5, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(6, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __param(7, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(8, (0, typeorm_1.InjectRepository)(mealPlan_entity_1.MealPlan)),
    __param(9, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(10, (0, typeorm_1.InjectRepository)(studentType_entity_1.StudentTpye)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RepoService);
//# sourceMappingURL=repo.service.js.map