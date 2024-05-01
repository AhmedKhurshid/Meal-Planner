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
exports.SendgridService = void 0;
const common_1 = require("@nestjs/common");
const SendGrid = require("@sendgrid/mail");
const constant_1 = require("../../constant");
let SendgridService = class SendgridService {
    constructor() {
        this.query = '<p><i>please feel free to contact us in case of any query.</i></p>';
        SendGrid.setApiKey(constant_1.ENV.MAIL_API_KEY);
    }
    async adminEmail({ to, subject, html }) {
        await this.sendEmail({
            to,
            subject,
            html,
        });
    }
    async forgetPassword({ to, name, uuidToken }) {
        await this.sendEmail({
            to,
            subject: 'Forget Password',
            html: `
            <h2>Dear ${name}</h2>
            <h3>Forget Password</h3>
            <p>Your Forget password Code is: ${uuidToken}
            `
        });
    }
    async signUpPassword({ to, name, password }) {
        await this.sendEmail({
            to,
            subject: 'Sign Up Password',
            html: `
            <h2>Dear ${name}</h2>
            <h3>Sign Up Password</h3>
            <p>Your Sign Up Password Code is: ${password}
            `
        });
    }
    async contactUs({ to, name, subject, message, email }) {
        await this.sendEmail({
            to,
            subject: `${subject}`,
            html: `
          <h2>Name: ${name}</h2>
          <h3>${subject}</h3>
          <p>${message}</a></p>
          <h2>From ${email}</h2>
          `
        });
    }
    sendEmail({ to, subject, html }) {
        html = html + this.query;
        return this.send({ from: constant_1.ENV.MAIL_FROM, to, subject, html });
    }
    send(mail) {
        return SendGrid.send(mail);
    }
};
exports.SendgridService = SendgridService;
exports.SendgridService = SendgridService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SendgridService);
//# sourceMappingURL=sandgrid.service.js.map