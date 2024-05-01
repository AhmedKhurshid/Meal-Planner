import { Injectable } from '@nestjs/common';
import { MealPlan } from 'core/entities/mealPlan.entity';
import { Item } from 'core/entities/item.entity';
import { User } from 'core/entities';

import { CoreService } from 'core/service';
import { ROLE, STATUS } from 'core/enums';
// import csvWriter from 'csv-writer';
// import csvParser from 'json2csv';
// import { createReadStream } from 'fs';
import { Response } from 'express';
import { PageOptionsDtoInvoice } from './dto/pageOptionInvoice.dto';
import { Vendor } from 'core/entities/vendor.entity';
// import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import * as excel from 'exceljs';

@Injectable()
export class InvoiceService extends CoreService {
    //   create(createInvoiceDto: CreateInvoiceDto) {
    //     return 'This action adds a new invoice';
    //   }


    async findAll(pageOptionsDto: PageOptionsDtoInvoice, response: Response) {

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Define the column sizes
        const columnSizes = {
            'A': 40,
            'B': 40,
            'C': 40,
            'D': 40,
            'E': 40,
            'F': 40,
            // Add more columns and their sizes as needed
        };

        // Set column widths based on the defined sizes
        Object.keys(columnSizes).forEach(column => {
            worksheet.getColumn(column).width = columnSizes[column];
        });

        const queryBuilder = this.repos.order.createQueryBuilder("order")
            .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(Item, 's', 's.id = m.itemId')
            .innerJoin(User, 'u', 'u.id = order.userId')
            .where(`order.status = "${STATUS.ACTIVE}"`)
            .orWhere("(u.role = :role)", {
                role: ROLE.STUDENT || ROLE.STAFF,
            })
            .select([
                "order.status as status",
                'order.quantity as orderedQuantity',
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
                orderedQuantity: element.orderedQuantity,
                status: element.status,
                itemName: element.itemName,
                itemType: element.itemType,
                costPrice: element.costPrice,
                markupPrice: element.markupPrice,
            }));

            // Add header row
            const headers = Object.keys(formattedData[0]);
            worksheet.addRow(headers);

            // Add data rows
            formattedData.forEach(data => {
                worksheet.addRow(Object.values(data));
            });

            // Set response headers
            response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            response.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');

            // Write the workbook to the response
            await workbook.xlsx.write(response);

            // End the response
            response.end();
        }
    }

    // async findAll(pageOptionsDto: PageOptionsDtoInvoice, response: Response) {

    //     const queryBuilder = this.repos.order.createQueryBuilder("order")
    //         .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
    //         .innerJoin(Item, 's', 's.id = m.itemId')
    //         .innerJoin(User, 'u', 'u.id = order.userId')
    //         .where(`order.status = "${STATUS.ACTIVE}"`)
    //         .orWhere("(u.role = :role)", {
    //             role: ROLE.STUDENT || ROLE.STAFF,

    //         })
    //         .select([
    //             "order.status as status",
    //             // "order.time as date",
    //             "DATE_FORMAT(order.time, '%Y-%m-%d') as orderedDate",
    //             // "m.status as mealStatus",
    //             // "m.date as mealPlanDate",
    //             // "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
    //             "s.name as itemName",
    //             "s.type as itemType",
    //             "s.costPrice as costPrice",
    //             "s.markupPrice as markupPrice",
    //             "u.id as userId",
    //             "u.name as userName",
    //             "u.email as userEmail",
    //             "u.gender as gender",
    //         ]);

    //     if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
    //         const entities = await queryBuilder.getRawMany();
    //         console.log(queryBuilder.getSql());
    //         console.log(queryBuilder.getParameters());


    //         const datedata = [];

    //         for (let index = 0; index < entities.length; index++) {
    //             const element = entities[index];

    //             // const timesSplit = element.date.toISOString().split('T')[0];

    //             const startDate = pageOptionsDto.startDate
    //             const endDate = pageOptionsDto.endDate

    //             // if (startDate <= timesSplit && endDate >= timesSplit) {
    //             if (startDate <= element.orderedDate && endDate >= element.orderedDate) {
    //                 datedata.push(element);
    //             }
    //         }
    //         const formattedData = entities.map(element => ({
    //             userId: this.formatColumn(element.userId, 40),
    //             userName: this.formatColumn(element.userName, 40),
    //             userEmail: this.formatColumn(element.userEmail, 40),
    //             gender: this.formatColumn(element.gender, 40),
    //             // vendorPaid: this.formatColumn(element.vendorPaid, 40),
    //             // vendorBalance: this.formatColumn(element.vendorBalance, 40),
    //             // vendorTotal: this.formatColumn(element.vendorTotal, 40),
    //             orderedDate: element.orderedDate,
    //             status: this.formatColumn(element.status, 40),
    //             itemName: this.formatColumn(element.itemName, 40),
    //             itemType: this.formatColumn(element.itemType, 40),
    //             // quantity: this.formatColumn(element.itemType, 40),
    //             costPrice: this.formatColumn(element.costPrice, 40),
    //             markupPrice: this.formatColumn(element.markupPrice, 40),

    //             // ... format other columns as needed
    //         }));

    //         const csvFields = ['userId', 'userName', 'userEmail', 'gender', 'orderedDate', 'status', 'itemName', 'itemType', 'costPrice', 'markupPrice'];
    //         // const csvFields = ['name', 'email'];
    //         const csv = json2csv.parse(formattedData, { fields: csvFields });

    //         response.setHeader('Content-Type', 'text/csv');
    //         response.setHeader('Content-Disposition', 'attachment; filename=export.csv');
    //         response.status(200).end(csv)
    //         // createReadStream(csv).pipe(response);
    //     }
    // }

    async findVendor(id: number, pageOptionsDto: PageOptionsDtoInvoice, response: Response) {
        const queryBuilder = this.repos.order.createQueryBuilder("order")
            .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
            .innerJoin(Item, 's', 's.id = m.itemId')
            .innerJoin(Vendor, 'v', 'v.id = s.vendorId')
            .where(`order.status = "${STATUS.ACTIVE}" AND v.id = :id`, { id })
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

            // Define column sizes
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

            // Add data
            worksheet.addRows(formattedData);

            // Set response headers for Excel
            response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            response.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');

            // Write to response
            await workbook.xlsx.write(response);
            response.end();
        }
    }

    // async findVendor(id: number, pageOptionsDto: PageOptionsDtoInvoice, response: Response) {

    //     const queryBuilder = this.repos.order.createQueryBuilder("order")
    //         .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
    //         .innerJoin(Item, 's', 's.id = m.itemId')
    //         // .innerJoin(User, 'u', 'u.id = order.userId')
    //         .innerJoin(Vendor, 'v', 'v.id = s.vendorId')
    //         .where(`order.status = "${STATUS.ACTIVE}" AND v.id = :id`, { id })
    //         // .orWhere("(u.role = :role)", {
    //         //     role: ROLE.STUDENT || ROLE.STAFF,

    //         // })
    //         .select([
    //             // "order.status as status",
    //             // "order.time as date",
    //             // "DATE_FORMAT(order.time, '%Y-%m-%d') as orderedDate",
    //             // "m.status as mealStatus",
    //             // "m.date as mealPlanDate",
    //             "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
    //             "s.name as itemName",
    //             "s.type as itemType",
    //             "s.quantity as quantity",
    //             "s.costPrice as costPrice",
    //             "s.markupPrice as markupPrice",
    //             "v.id as vendorId",
    //             "v.name as vendorName",
    //             "v.email as vendorEmail",
    //             "v.phone as vendorPhone",
    //             "v.address as vendorAddress",
    //             "v.paid as vendorPaid",
    //             "v.balance as vendorBalance",
    //             "v.total as vendorTotal",
    //             // "v.gender as vendorGender",
    //         ]);

    //     if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
    //         const entities = await queryBuilder.getRawMany();
    //         console.log(queryBuilder.getSql());
    //         console.log(queryBuilder.getParameters());


    //         const datedata = [];

    //         for (let index = 0; index < entities.length; index++) {
    //             const element = entities[index];

    //             // const timesSplit = element.date.toISOString().split('T')[0];

    //             const startDate = pageOptionsDto.startDate
    //             const endDate = pageOptionsDto.endDate

    //             // if (startDate <= timesSplit && endDate >= timesSplit) {
    //             if (startDate <= element.mealDate && endDate >= element.mealDate) {
    //                 datedata.push(element);
    //             }
    //         }

    //         const formattedData = entities.map(element => ({
    //             vendorId: this.formatColumn(element.vendorId, 40),
    //             vendorName: this.formatColumn(element.vendorName, 40),
    //             vendorEmail: this.formatColumn(element.vendorEmail, 40),
    //             vendorPhone: this.formatColumn(element.vendorPhone, 40),
    //             vendorAddress: this.formatColumn(element.vendorAddress, 40),
    //             vendorPaid: this.formatColumn(element.vendorPaid, 40),
    //             vendorBalance: this.formatColumn(element.vendorBalance, 40),
    //             vendorTotal: this.formatColumn(element.vendorTotal, 40),
    //             mealDate: element.mealDate,
    //             itemName: this.formatColumn(element.itemName, 40),
    //             itemType: this.formatColumn(element.itemType, 40),
    //             quantity: this.formatColumn(element.itemType, 40),
    //             costPrice: this.formatColumn(element.costPrice, 40),
    //             markupPrice: this.formatColumn(element.markupPrice, 40),

    //             // ... format other columns as needed
    //         }));

    //         const csvFields = ['vendorId', 'vendorName', 'vendorEmail', 'vendorPhone', 'vendorAddress', 'vendorPaid', 'vendorBalance', 'vendorTotal', 'mealDate', 'itemName', 'itemType', 'quantity', 'costPrice', 'markupPrice'];
    //         // const csvFields = [`'vendorId', 'vendorName', vendorEmail, vendorPhone, vendorAddress, vendorPaid, vendorBalance, vendorTotal, mealDate, itemName, itemType, quantity, costPrice, markupPrice`];

    //         const csv = json2csv.parse(formattedData, { fields: csvFields });

    //         // response.setHeader('Content-Type', 'text/csv');
    //         // response.setHeader('Content-Disposition', 'attachment; filename=export.csv');
    //         // response.status(200).end(csv);



    //         response.setHeader('Content-Type', 'text/csv');
    //         response.setHeader('Content-Disposition', 'attachment; filename=export.csv');
    //         response.status(200).end(csv)
    //         // createReadStream(csv).pipe(response);
    //     }
    // }
    // // Helper method to format column value with padding or truncation
    // private formatColumn(value: string, width: number): string {
    //     // Adjust the value as needed (e.g., pad or truncate)
    //     // Example: Padding with spaces to the right
    //     return value.padEnd(width);
    // }

    private formatColumn(value: any, width: number): string {
        // Convert the value to a string if it's not already
        const stringValue = String(value);

        // Adjust the value as needed (e.g., pad or truncate)
        // Example: Padding with spaces to the right
        return stringValue.padEnd(width);
    }

    //     //   findAll() {
    //     //     return `This action returns all invoice`;
    //     //   }

    //     //   findOne(id: number) {
    //     //     return `This action returns a #${id} invoice`;
    //     //   }

    //     //   update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    //     //     return `This action updates a #${id} invoice`;
    //     //   }

    //     //   remove(id: number) {
    //     //     return `This action removes a #${id} invoice`;
    //     //   }
    // }
}

