"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const constant_1 = require("../../core/constant");
let RtStrategy = class RtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, constant_1.ENV.JWT_REFRESH_TOKEN) {
    constructor(config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: constant_1.ENV.JWT_RT_SECRET,
        });
    }
    validate(req, payload) {
        var _a;
        const refreshToken = (_a = req === null || req === void 0 ? void 0 : req.get('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
        if (!refreshToken)
            throw new common_1.ForbiddenException('Refresh token malformed');
        return Object.assign(Object.assign({}, payload), { refreshToken });
    }
};
exports.RtStrategy = RtStrategy;
exports.RtStrategy = RtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RtStrategy);
//# sourceMappingURL=rt.strategy.js.map