"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseEntities = exports.entities = void 0;
const user_entity_1 = require("./user.entity");
const entities_1 = require("./");
const service_entity_1 = require("./service.entity");
const serviceForm_entity_1 = require("./serviceForm.entity");
const notification_entity_1 = require("./notification.entity");
const student_entity_1 = require("./student.entity");
const vendor_entity_1 = require("./vendor.entity");
const item_entity_1 = require("./item.entity");
const order_entity_1 = require("./order.entity");
const mealPlan_entity_1 = require("./mealPlan.entity");
const studentType_entity_1 = require("./studentType.entity");
exports.entities = [
    user_entity_1.User,
    service_entity_1.Service,
    serviceForm_entity_1.ServiceForm,
    notification_entity_1.Notification,
    student_entity_1.Student,
    vendor_entity_1.Vendor,
    item_entity_1.Item,
    order_entity_1.Order,
    mealPlan_entity_1.MealPlan,
    studentType_entity_1.StudentTpye
];
exports.baseEntities = [entities_1.AlphaModel, entities_1.BetaModel];
//# sourceMappingURL=entities.js.map