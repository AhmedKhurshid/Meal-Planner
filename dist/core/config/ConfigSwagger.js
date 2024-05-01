"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const configSwagger = (app) => {
    const swaggerDoc = new swagger_1.DocumentBuilder()
        .setTitle('MEAL PLAN (ML)')
        .setDescription('This Application in Process')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    swagger_1.SwaggerModule.setup('/', app, swagger_1.SwaggerModule.createDocument(app, swaggerDoc));
};
exports.configSwagger = configSwagger;
//# sourceMappingURL=ConfigSwagger.js.map