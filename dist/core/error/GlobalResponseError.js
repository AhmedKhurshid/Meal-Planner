"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalResponseError = void 0;
const GlobalResponseError = (statusCode, message, code, request) => {
    return {
        statusCode: statusCode,
        message,
        code,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
    };
};
exports.GlobalResponseError = GlobalResponseError;
//# sourceMappingURL=GlobalResponseError.js.map