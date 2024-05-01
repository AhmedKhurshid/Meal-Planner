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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const vendor_service_1 = require("./vendor.service");
const create_vendor_dto_1 = require("./dto/create-vendor.dto");
const update_vendor_dto_1 = require("./dto/update-vendor.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../core/decorators");
const enums_1 = require("../../core/enums");
const pageOption_dto_1 = require("./dto/pageOption.dto");
const change_status_dto_1 = require("./dto/change-status.dto");
const testing_1 = require("../../core/common/testing");
const vendor_detail_dto_1 = require("./ResponseModel/vendor-detail.dto");
const pageOptionInvoice_dto_1 = require("../invoice/dto/pageOptionInvoice.dto");
let VendorController = class VendorController {
    constructor(vendorService) {
        this.vendorService = vendorService;
    }
    async create(createVendorDto) {
        return await this.vendorService.create(createVendorDto);
    }
    async findAll(pageOption) {
        return await this.vendorService.findAll(pageOption);
    }
    async findAllWithOutPagination() {
        return await this.vendorService.findAllWithOutPagination();
    }
    async findOne(id) {
        return await this.vendorService.findOne(id);
    }
    async update(id, updateVendorDto) {
        return await this.vendorService.update(id, updateVendorDto);
    }
    changeLawyerStatus(body, id) {
        return this.vendorService.changeStatus(body, id);
    }
    async findVendor(pageOptionsDto) {
        return this.vendorService.findVendor(pageOptionsDto);
    }
};
exports.VendorController = VendorController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, testing_1.ApiResponseBody)(vendor_detail_dto_1.NewVendor),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vendor_dto_1.CreateVendorDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOption_dto_1.PageOptionDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lists'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findAllWithOutPagination", null);
__decorate([
    (0, common_1.Get)('list/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STUDENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vendor_dto_1.UpdateVendorDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('change/status/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_status_dto_1.ChangeStatusDto, Number]),
    __metadata("design:returntype", void 0)
], VendorController.prototype, "changeLawyerStatus", null);
__decorate([
    (0, common_1.Get)('all/vendor'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOptionInvoice_dto_1.PageOptionsDtoInvoice]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findVendor", null);
exports.VendorController = VendorController = __decorate([
    (0, common_1.Controller)('vendor'),
    (0, swagger_1.ApiTags)('vendor'),
    __metadata("design:paramtypes", [vendor_service_1.VendorService])
], VendorController);
//# sourceMappingURL=vendor.controller.js.map