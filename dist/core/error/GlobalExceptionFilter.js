"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const GlobalResponseError_1 = require("./GlobalResponseError");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let message = exception.message.message;
        let code = 'HttpException';
        common_1.Logger.error(message, exception.stack, `${request.method} ${request.url}`);
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        switch (exception.constructor) {
            case common_1.HttpException:
                status = exception.getStatus();
                break;
            case typeorm_1.QueryFailedError:
                status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                code = exception.code;
                break;
            case typeorm_1.EntityNotFoundError:
                status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                code = exception.code;
                break;
            case typeorm_1.CannotCreateEntityIdMapError:
                status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
                message = exception.message;
                code = exception.code;
                break;
            default:
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        response
            .status(status)
            .json((0, GlobalResponseError_1.GlobalResponseError)(status, message, code, request));
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=GlobalExceptionFilter.js.map