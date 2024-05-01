import { MailerService } from "@nestjs-modules/mailer";
export declare class MailService {
    mailerService: MailerService;
    constructor(mailerService: MailerService);
    send({ to, subject, html }: {
        to: any;
        subject: any;
        html: any;
    }): Promise<void>;
    sendTemplate(): void;
    sendTemplateNoReply(): void;
}
