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
exports.ServiceForm = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("./service.entity");
const alpha_model_1 = require("./alpha-model");
let ServiceForm = class ServiceForm extends alpha_model_1.AlphaModel {
};
exports.ServiceForm = ServiceForm;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceForm.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceForm.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceForm.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceForm.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceForm.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ServiceForm.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], ServiceForm.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (x) => x.serviceForm),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId', foreignKeyConstraintName: 'fk_ServiceForm' }),
    __metadata("design:type", service_entity_1.Service)
], ServiceForm.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ServiceForm.prototype, "serviceId", void 0);
exports.ServiceForm = ServiceForm = __decorate([
    (0, typeorm_1.Entity)()
], ServiceForm);
//# sourceMappingURL=serviceForm.entity.js.map