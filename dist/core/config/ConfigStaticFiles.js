"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStaticFiles = void 0;
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
exports.configStaticFiles = serve_static_1.ServeStaticModule.forRoot({
    rootPath: (0, path_1.join)(__dirname, '..', 'public'),
});
//# sourceMappingURL=ConfigStaticFiles.js.map