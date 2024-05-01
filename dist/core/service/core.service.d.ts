import { Logger } from '@nestjs/common';
import { RepoService } from 'core/shared/service/repo.service';
import { SendgridService } from 'core/shared/service/sandgrid.service';
export declare class CoreService {
    repos: RepoService;
    mail: SendgridService;
    logger: Logger;
    constructor();
}
