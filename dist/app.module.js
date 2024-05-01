"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const config_2 = require("./core/config");
const role_guard_1 = require("./core/guards/role.guard");
const feature_module_1 = require("./feature/feature.module");
const auth_module_1 = require("./auth/auth.module");
const guards_1 = require("./core/guards");
const admin_module_1 = require("./admin/admin.module");
const shared_module_1 = require("./core/shared/shared.module");
const middleware_1 = require("./core/middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            platform_express_1.MulterModule.register({
                dest: '../public',
            }),
            config_2.configStaticFiles,
            config_2.TypeOrmModuleRootAsync,
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            feature_module_1.FeatureModule,
            admin_module_1.AdminModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map