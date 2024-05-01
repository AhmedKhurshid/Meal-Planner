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
exports.StudenTtypeController = void 0;
const common_1 = require("@nestjs/common");
const studen_ttype_service_1 = require("./studen-ttype.service");
const create_studen_ttype_dto_1 = require("./dto/create-studen-ttype.dto");
const update_studen_ttype_dto_1 = require("./dto/update-studen-ttype.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../core/decorators");
const enums_1 = require("../../core/enums");
const pageOption_dto_1 = require("../../admin/dto/pageOption.dto");
let StudenTtypeController = class StudenTtypeController {
    constructor(studenTtypeService) {
        this.studenTtypeService = studenTtypeService;
    }
    create(createStudenTtypeDto) {
        return this.studenTtypeService.create(createStudenTtypeDto);
    }
    findAll(pageOptionsDto) {
        return this.studenTtypeService.getNotificationList(pageOptionsDto);
    }
    findOne(id) {
        return this.studenTtypeService.findOne(id);
    }
    update(id, updateStudenTtypeDto) {
        return this.studenTtypeService.update(id, updateStudenTtypeDto);
    }
    remove(id) {
        return this.studenTtypeService.remove(id);
    }
};
exports.StudenTtypeController = StudenTtypeController;
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_studen_ttype_dto_1.CreateStudenTtypeDto]),
    __metadata("design:returntype", void 0)
], StudenTtypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionsDto]),
    __metadata("design:returntype", void 0)
], StudenTtypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudenTtypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_studen_ttype_dto_1.UpdateStudenTtypeDto]),
    __metadata("design:returntype", void 0)
], StudenTtypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudenTtypeController.prototype, "remove", null);
exports.StudenTtypeController = StudenTtypeController = __decorate([
    (0, common_1.Controller)('student-type'),
    (0, swagger_1.ApiTags)('studentType'),
    __metadata("design:paramtypes", [studen_ttype_service_1.StudenTtypeService])
], StudenTtypeController);
//# sourceMappingURL=studen-ttype.controller.js.map