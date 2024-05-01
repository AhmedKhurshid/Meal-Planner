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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const alpha_model_1 = require("./alpha-model");
const user_entity_1 = require("./user.entity");
const studentType_entity_1 = require("./studentType.entity");
let Student = class Student extends alpha_model_1.AlphaModel {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '', length: 15 }),
    __metadata("design:type", String)
], Student.prototype, "secPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "allergies", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (x) => x.students),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_user_student' }),
    __metadata("design:type", user_entity_1.User)
], Student.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => studentType_entity_1.StudentTpye, (x) => x.type),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'fk_Student_type' }),
    __metadata("design:type", Number)
], Student.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "typeId", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)()
], Student);
//# sourceMappingURL=student.entity.js.map