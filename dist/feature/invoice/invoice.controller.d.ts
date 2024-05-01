import { InvoiceService } from './invoice.service';
import { Response } from 'express';
import { PageOptionsDtoInvoice } from './dto/pageOptionInvoice.dto';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(pageOptionsDto: PageOptionsDtoInvoice, response: Response): Promise<void>;
    findVendor(id: number, pageOptionsDto: PageOptionsDtoInvoice, response: Response): Promise<void>;
}
