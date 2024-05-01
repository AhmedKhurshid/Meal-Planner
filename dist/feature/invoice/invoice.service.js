"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const mealPlan_entity_1 = require("../../core/entities/mealPlan.entity");
const item_entity_1 = require("../../core/entities/item.entity");
const entities_1 = require("../../core/entities");
const service_1 = require("../../core/service");
const enums_1 = require("../../core/enums");
const vendor_entity_1 = require("../../core/entities/vendor.entity");
const ExcelJS = require("exceljs");
const excel = require("exceljs");
let InvoiceService = class InvoiceService extends service_1.CoreService {
    async findAll(pageOptionsDto, response) {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        const columnSizes = {
            'A': 40,
            'B': 40,
            'C': 40,
            'D': 40,
            'E': 40,
            'F': 40,
        };
        Object.keys(columnSizes).forEach(column => {
            worksheet.getColumn(column).width = columnSizes[column];
        });
        const queryBuilder = this.repos.order.createQueryBuilder("order")
            .innerJoin(mealPlan_entity_1.MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(item_entity_1.Item, 's', 's.id = m.itemId')
            .innerJoin(entities_1.User, 'u', 'u.id = order.userId')
            .where(`order.status = "${enums_1.STATUS.ACTIVE}"`)
            .orWhere("(u.role = :role)", {
            role: enums_1.ROLE.STUDENT || enums_1.ROLE.STAFF,
        })
            .select([
            "order.status as status",
            "DATE_FORMAT(order.time, '%Y-%m-%d') as orderedDate",
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
            const formattedData = entities.map(element => ({
                userId: element.userId,
                userName: element.userName,
                userEmail: element.userEmail,
                gender: element.gender,
                orderedDate: element.orderedDate,
                status: element.status,
                itemName: element.itemName,
                itemType: element.itemType,
                costPrice: element.costPrice,
                markupPrice: element.markupPrice,
            }));
            const headers = Object.keys(formattedData[0]);
            worksheet.addRow(headers);
            formattedData.forEach(data => {
                worksheet.addRow(Object.values(data));
            });
            response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            response.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');
            await workbook.xlsx.write(response);
            response.end();
        }
    }
    async findVendor(id, pageOptionsDto, response) {
        const queryBuilder = this.repos.order.createQueryBuilder("order")
            .innerJoin(mealPlan_entity_1.MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(item_entity_1.Item, 's', 's.id = m.itemId')
            .innerJoin(vendor_entity_1.Vendor, 'v', 'v.id = s.vendorId')
            .where(`order.status = "${enums_1.STATUS.ACTIVE}" AND v.id = :id`, { id })
            .select([
            "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
            "s.name as itemName",
            "s.type as itemType",
            "s.quantity as quantity",
            "s.costPrice as costPrice",
            "s.markupPrice as markupPrice",
            "v.id as vendorId",
            "v.name as vendorName",
            "v.email as vendorEmail",
            "v.phone as vendorPhone",
            "v.address as vendorAddress",
            "v.paid as vendorPaid",
            "v.balance as vendorBalance",
            "v.total as vendorTotal",
        ]);
        if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
            const entities = await queryBuilder.getRawMany();
            const formattedData = entities.map(element => ({
                vendorId: this.formatColumn(element.vendorId, 40),
                vendorName: this.formatColumn(element.vendorName, 40),
                vendorEmail: this.formatColumn(element.vendorEmail, 40),
                vendorPhone: this.formatColumn(element.vendorPhone, 40),
                vendorAddress: this.formatColumn(element.vendorAddress, 40),
                vendorPaid: this.formatColumn(element.vendorPaid, 40),
                vendorBalance: this.formatColumn(element.vendorBalance, 40),
                vendorTotal: this.formatColumn(element.vendorTotal, 40),
                mealDate: element.mealDate,
                itemName: this.formatColumn(element.itemName, 40),
                itemType: this.formatColumn(element.itemType, 40),
                quantity: this.formatColumn(element.quantity, 40),
                costPrice: this.formatColumn(element.costPrice, 40),
                markupPrice: this.formatColumn(element.markupPrice, 40),
            }));
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet 1');
            worksheet.columns = [
                { header: 'vendorId', key: 'vendorId', width: 40 },
                { header: 'vendorName', key: 'vendorName', width: 40 },
                { header: 'vendorEmail', key: 'vendorEmail', width: 40 },
                { header: 'vendorPhone', key: 'vendorPhone', width: 40 },
                { header: 'vendorAddress', key: 'vendorAddress', width: 40 },
                { header: 'vendorPaid', key: 'vendorPaid', width: 40 },
                { header: 'vendorBalance', key: 'vendorBalance', width: 40 },
                { header: 'vendorTotal', key: 'vendorTotal', width: 40 },
                { header: 'mealDate', key: 'mealDate', width: 40 },
                { header: 'itemName', key: 'itemName', width: 40 },
                { header: 'itemType', key: 'itemType', width: 40 },
                { header: 'quantity', key: 'quantity', width: 40 },
                { header: 'costPrice', key: 'costPrice', width: 40 },
                { header: 'markupPrice', key: 'markupPrice', width: 40 },
            ];
            worksheet.addRows(formattedData);
            response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            response.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');
            await workbook.xlsx.write(response);
            response.end();
        }
    }
    formatColumn(value, width) {
        const stringValue = String(value);
        return stringValue.padEnd(width);
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)()
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map