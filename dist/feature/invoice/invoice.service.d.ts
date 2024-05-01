import { CoreService } from 'core/service';
import { Response } from 'express';
import { PageOptionsDtoInvoice } from './dto/pageOptionInvoice.dto';
export declare class InvoiceService extends CoreService {
    findAll(pageOptionsDto: PageOptionsDtoInvoice, response: Response): Promise<void>;
    findVendor(id: number, pageOptionsDto: PageOptionsDtoInvoice, response: Response): Promise<void>;
    private formatColumn;
}
