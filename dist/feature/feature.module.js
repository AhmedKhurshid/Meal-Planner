"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModule = void 0;
const common_1 = require("@nestjs/common");
const service_module_1 = require("./service/service.module");
const vendor_module_1 = require("./vendor/vendor.module");
const item_module_1 = require("./item/item.module");
const meal_module_1 = require("./meal/meal.module");
const invoice_module_1 = require("./invoice/invoice.module");
const meal_plan_module_1 = require("./meal-plan/meal-plan.module");
const studen_ttype_module_1 = require("./studen-ttype/studen-ttype.module");
let FeatureModule = class FeatureModule {
};
exports.FeatureModule = FeatureModule;
exports.FeatureModule = FeatureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            service_module_1.ServiceModule,
            vendor_module_1.VendorModule,
            item_module_1.ItemModule,
            meal_module_1.MealModule,
            invoice_module_1.InvoiceModule,
            meal_plan_module_1.MealPlanModule,
            studen_ttype_module_1.StudenTtypeModule,
        ],
    })
], FeatureModule);
//# sourceMappingURL=feature.module.js.map