"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encodePassword = void 0;
const bcrypt_1 = require("bcrypt");
function encodePassword(password) {
    const SALT = (0, bcrypt_1.genSaltSync)();
    return (0, bcrypt_1.hashSync)(password, SALT);
}
exports.encodePassword = encodePassword;
function comparePassword(password, hash) {
    return (0, bcrypt_1.compareSync)(password, hash);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map