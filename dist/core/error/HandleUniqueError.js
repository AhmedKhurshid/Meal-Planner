"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleUniqueError = void 0;
const common_1 = require("@nestjs/common");
const HandleUniqueError = (err) => {
    const check = (check) => {
        return err.sqlMessage.indexOf(check) != -1;
    };
    const result = (message) => {
        throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
    };
    if (check('book-title-unique'))
        return result('already a book exsit with this title');
};
exports.HandleUniqueError = HandleUniqueError;
//# sourceMappingURL=HandleUniqueError.js.map