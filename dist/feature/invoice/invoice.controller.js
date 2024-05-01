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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../core/decorators");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../core/enums");
const invoice_service_1 = require("./invoice.service");
const common_2 = require("@nestjs/common");
const pageOptionInvoice_dto_1 = require("./dto/pageOptionInvoice.dto");
let InvoiceController = class InvoiceController {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async findAll(pageOptionsDto, response) {
        const pdfDoc = await this.invoiceService.findAll(pageOptionsDto, response);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename=invoices.pdf');
        return pdfDoc;
    }
    async findVendor(id, pageOptionsDto, response) {
        const csvData = await this.invoiceService.findVendor(id, pageOptionsDto, response);
        response.setHeader('Content-Type', 'text/csv');
        response.setHeader('Content-Disposition', 'attachment; filename=export.csv');
        response.status(200).end(csvData);
    }
};
exports.InvoiceController = InvoiceController;
__decorate([
    (0, common_1.Get)('order/list'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pageOptionInvoice_dto_1.PageOptionsDtoInvoice, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('vendor/list/:id'),
    (0, decorators_1.Roles)(enums_1.ROLE.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pageOptionInvoice_dto_1.PageOptionsDtoInvoice, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findVendor", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, common_1.Controller)('invoice'),
    (0, swagger_1.ApiTags)('invoice'),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map