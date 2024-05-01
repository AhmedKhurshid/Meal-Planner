"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseBody = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseModel_1 = require("./ResponseModel");
const ApiResponseBody = (dataDto) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(ResponseModel_1.ResponseData, dataDto), (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(ResponseModel_1.ResponseData) },
                {
                    properties: {
                        statusCode: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(dataDto) }
                        }
                    }
                }
            ]
        }
    }));
};
exports.ApiResponseBody = ApiResponseBody;
//# sourceMappingURL=testing.js.map