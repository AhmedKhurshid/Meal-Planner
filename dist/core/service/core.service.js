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
exports.CoreService = void 0;
const common_1 = require("@nestjs/common");
const repo_service_1 = require("../shared/service/repo.service");
const sandgrid_service_1 = require("../shared/service/sandgrid.service");
class CoreService {
    constructor() {
        this.logger = new common_1.Logger();
    }
}
exports.CoreService = CoreService;
__decorate([
    (0, common_1.Inject)(repo_service_1.RepoService),
    __metadata("design:type", repo_service_1.RepoService)
], CoreService.prototype, "repos", void 0);
__decorate([
    (0, common_1.Inject)(sandgrid_service_1.SendgridService),
    __metadata("design:type", sandgrid_service_1.SendgridService)
], CoreService.prototype, "mail", void 0);
//# sourceMappingURL=core.service.js.map