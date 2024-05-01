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
exports.StudentTpye = void 0;
const typeorm_1 = require("typeorm");
const alpha_model_1 = require("./alpha-model");
const student_entity_1 = require("./student.entity");
let StudentTpye = class StudentTpye extends alpha_model_1.AlphaModel {
};
exports.StudentTpye = StudentTpye;
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], StudentTpye.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (student) => student.typeId),
    __metadata("design:type", Array)
], StudentTpye.prototype, "type", void 0);
exports.StudentTpye = StudentTpye = __decorate([
    (0, typeorm_1.Entity)()
], StudentTpye);
//# sourceMappingURL=studentType.entity.js.map