"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtGuard = void 0;
const passport_1 = require("@nestjs/passport");
const constant_1 = require("../constant");
class RtGuard extends (0, passport_1.AuthGuard)(constant_1.ENV.JWT_REFRESH_TOKEN) {
    constructor() {
        super();
    }
}
exports.RtGuard = RtGuard;
//# sourceMappingURL=rt.guard.js.map