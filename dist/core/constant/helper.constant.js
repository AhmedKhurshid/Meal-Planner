"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLawyerPassword = exports.generateCode = exports.generatePassword = exports.throwForbiddenExceptiontitle = exports.throwForbiddenExceptionPasswordNotMatch = exports.throwForbiddenExceptionServiceName = exports.throwForbiddenExceptionName = exports.throwForbiddenExceptionFileRequried = exports.throwForbiddenExceptionUser = exports.throwForbiddenException = exports.deSearalizeUsers = exports.deSearalizeUser = exports.searalizeUser = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const ResponseModel_1 = require("../common/ResponseModel");
const respose_code_status_1 = require("../enums/respose-code-status");
const enums_1 = require("@nestjs/common/enums");
const searalizeUser = (d, role, status) => {
    const user = {
        email: d.email,
        name: d.name,
        gender: d.gender,
        phone: d.phone,
        role,
        status,
        password: '',
        image: d.image,
        address: d.address,
    };
    return user;
};
exports.searalizeUser = searalizeUser;
const deSearalizeUser = (d) => {
    const result = Object.assign(Object.assign(Object.assign({}, d), d === null || d === void 0 ? void 0 : d.user), { desc: d === null || d === void 0 ? void 0 : d.desc });
    delete result.userId;
    delete result.hashedRt;
    delete result.password;
    delete result.user;
    delete result.role;
    return result;
};
exports.deSearalizeUser = deSearalizeUser;
const deSearalizeUsers = (d) => {
    return d.map((y) => (0, exports.deSearalizeUser)(y));
};
exports.deSearalizeUsers = deSearalizeUsers;
const res = new ResponseModel_1.ResponseData();
const throwForbiddenException = (data) => {
    res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
    res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.EMAILALREADYEXISIT];
    if (data)
        throw new exceptions_1.BadRequestException(res);
};
exports.throwForbiddenException = throwForbiddenException;
const throwForbiddenExceptionUser = (data) => {
    res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
    res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.USERNOTEXISIT];
    if (!data)
        throw new exceptions_1.BadRequestException(res);
};
exports.throwForbiddenExceptionUser = throwForbiddenExceptionUser;
const throwForbiddenExceptionFileRequried = (data) => {
    res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
    res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.FILEREQURIED];
    if (!data)
        throw new exceptions_1.BadRequestException(res);
};
exports.throwForbiddenExceptionFileRequried = throwForbiddenExceptionFileRequried;
const throwForbiddenExceptionName = (data) => {
    res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
    res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.NAMEALREADYEXISIT];
    if (data)
        throw new exceptions_1.BadRequestException(res);
};
exports.throwForbiddenExceptionName = throwForbiddenExceptionName;
const throwForbiddenExceptionServiceName = (data) => {
    res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
    res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.SERVICENAMEALREADYEXISIT];
    if (data)
        throw new exceptions_1.BadRequestException(res);
};
exports.throwForbiddenExceptionServiceName = throwForbiddenExceptionServiceName;
const throwForbiddenExceptionPasswordNotMatch = () => {
    res.message = [respose_code_status_1.RESPOSE_CODE_MESSAGE.PASSWORDNOTMATCH];
    res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
    return res;
};
exports.throwForbiddenExceptionPasswordNotMatch = throwForbiddenExceptionPasswordNotMatch;
const throwForbiddenExceptiontitle = (data) => {
    if (data)
        throw new common_1.ForbiddenException('Title already exsit');
};
exports.throwForbiddenExceptiontitle = throwForbiddenExceptiontitle;
const generatePassword = () => {
    let result = '';
    const characters = '!@#~%^&*()_+}{":ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generatePassword = generatePassword;
const generateCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const res = `MEAL${result}`;
    return res;
};
exports.generateCode = generateCode;
const generateLawyerPassword = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXY0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateLawyerPassword = generateLawyerPassword;
//# sourceMappingURL=helper.constant.js.map