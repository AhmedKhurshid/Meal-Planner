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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    send({ to, subject, html }) {
        return this
            .mailerService
            .sendMail({
            from: 'noreply@nestjs.com',
            to,
            subject,
            html
        })
            .then((success) => {
            console.log(success);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    sendTemplate() {
        this
            .mailerService
            .sendMail({
            to: 'test@nestjs.com',
            from: 'noreply@nestjs.com',
            subject: 'Testing Nest Mailermodule with template ✔',
            template: 'index',
            context: {
                code: 'cf1a3f828287',
                username: 'john doe',
            },
        })
            .then((success) => {
            console.log(success);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    sendTemplateNoReply() {
        this
            .mailerService
            .sendMail({
            to: 'test@nestjs.com',
            from: 'noreply@nestjs.com',
            subject: 'Testing Nest Mailermodule with template ✔',
            template: '/index',
            context: {
                code: 'cf1a3f828287',
                username: 'john doe',
            },
        })
            .then((success) => {
            console.log(success);
        })
            .catch((err) => {
            console.log(err);
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map