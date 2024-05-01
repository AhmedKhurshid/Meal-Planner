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
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const item_service_1 = require("./item.service");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const decorators_1 = require("../../core/decorators");
const enums_1 = require("../../core/enums");
const swagger_1 = require("@nestjs/swagger");
const testing_1 = require("../../core/common/testing");
const item_info_dto_1 = require("./ResponseModel/item.info.dto");
const itemPageOption_dto_1 = require("./dto/itemPageOption.dto");
const change_status_dto_1 = require("./dto/change-status.dto");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    async create(createItemDto, id) {
        createItemDto.userId = id;
        return await this.itemService.create(createItemDto);
    }
    async findAll(pageOptionItemDto) {
        return await this.itemService.findAll(pageOptionItemDto);
    }
    async findWithoutPagintaion() {
        return await this.itemService.findWithoutPagintaion();
    }
    async findOne(id) {
        return await this.itemService.findOne(id);
    }
    async update(id, updateItemDto) {
        return await this.itemService.update(id, updateItemDto);
    }
    changeStatus(body, id) {
        return this.itemService.changeStatus(body, id);
    }
};
exports.ItemController = ItemController;
__decorate([
    (0, common_1.Post)('create'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, testing_1.ApiResponseBody)(item_info_dto_1.ItemInfo),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto, Number]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STAFF, enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [itemPageOption_dto_1.ItemPageOptionDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lists'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STAFF, enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "findWithoutPagintaion", null);
__decorate([
    (0, common_1.Get)('list/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN, enums_1.ROLE.STAFF, enums_1.ROLE.STUDENT),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('changeStatus/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_status_dto_1.ChangeStatusDto, Number]),
    __metadata("design:returntype", void 0)
], ItemController.prototype, "changeStatus", null);
exports.ItemController = ItemController = __decorate([
    (0, common_1.Controller)('item'),
    (0, swagger_1.ApiTags)('item'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
//# sourceMappingURL=item.controller.js.map