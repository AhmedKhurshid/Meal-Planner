import { Controller, Get, Param, Query } from '@nestjs/common';
// import { InvoiceService } from './invoice.service';
// import { CreateInvoiceDto } from './dto/create-invoice.dto';
// import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Roles } from 'core/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ROLE } from 'core/enums';
import { InvoiceService } from './invoice.service';
// import { response } from 'express';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { PageOptionsDtoInvoice } from './dto/pageOptionInvoice.dto';
// import { Public } from 'src/auth/decorators/public.decorator';
// import { PageOptionsDtoOrder } from 'src/common/dto/page-options.dto';
// import { ROLE } from 'src/common/enums';
// import { InvoiceService } from './invoice.service';

@Controller('invoice')
@ApiTags('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }


    //   @Post()
    //   create(@Body() createInvoiceDto: CreateInvoiceDto) {
    //     return this.invoiceService.create(createInvoiceDto);
    //   }

    //   @Get()
    //   findAll() {
    //     return this.invoiceService.findAll();
    //   }

    // @Get('list')
    // @Roles(ROLE.ADMIN)
    // @ApiBearerAuth()
    // async findAll(@Query() pageOptionsDto: PageOptionsDtoOrder, @Res() response: Response) {
    //     const pdfDoc = await this.mealService.findAll(pageOptionsDto);
    //     pdfDoc.pipe(response);
    //     pdfDoc.end();
    // }


    @Get('order/list')
    @Roles(ROLE.ADMIN)
    @ApiBearerAuth()
    // @Public()
    async findAll(@Query() pageOptionsDto: PageOptionsDtoInvoice, @Res() response: Response) {
        // async findAll(@Res() response: Response) {
        const pdfDoc = await this.invoiceService.findAll(pageOptionsDto, response);

        // Set the appropriate headers for PDF response
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename=invoices.pdf');
        return pdfDoc;

        // Pipe the PDF document directly to the response
        // pdfDoc.pipe(response);
        // pdfDoc.end();
    }

    @Get('vendor/list/:id')
    // @Public()
    @Roles(ROLE.ADMIN)
    @ApiBearerAuth()
    async findVendor(@Param('id') id: number, @Query() pageOptionsDto: PageOptionsDtoInvoice, @Res() response: Response) {
        const csvData = await this.invoiceService.findVendor(id, pageOptionsDto, response);

        // Set the appropriate headers for CSV response
        response.setHeader('Content-Type', 'text/csv');
        response.setHeader('Content-Disposition', 'attachment; filename=export.csv');
        response.status(200).end(csvData);
    }

    // @Get('list')
    // // @Roles(ROLE.ADMIN)
    // @Public()
    // @ApiBearerAuth()
    // async findAll(@Query() pageOptionsDto: PageOptionsDtoOrder) {
    //     return await this.invoiceService.findAll(pageOptionsDto);
    // }

    //   @Get(':id')
    //   findOne(@Param('id') id: string) {
    //     return this.invoiceService.findOne(+id);
    //   }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    //     return this.invoiceService.update(+id, updateInvoiceDto);
    //   }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.invoiceService.remove(+id);
    //   }
}

