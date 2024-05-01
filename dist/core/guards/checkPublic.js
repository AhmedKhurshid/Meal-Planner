"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CheckPublic(reflector, context) {
    const isPublic = reflector.getAllAndOverride('isPublic', [
        context.getHandler(),
        context.getClass(),
    ]);
    return isPublic;
}
exports.default = CheckPublic;
//# sourceMappingURL=checkPublic.js.map