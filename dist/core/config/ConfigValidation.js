"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidation = void 0;
const common_1 = require("@nestjs/common");
exports.configValidation = new common_1.ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
});
//# sourceMappingURL=ConfigValidation.js.map