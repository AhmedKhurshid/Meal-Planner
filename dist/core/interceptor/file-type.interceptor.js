"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePDFTypeInterceptor = exports.FileImageTypeInterceptor = exports.FileTypeInterceptor = exports.PDF_ImageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const PDF_ImageInterceptor = (req, file, callback) => {
    if ((file === null || file === void 0 ? void 0 : file.fieldname) == 'image' &&
        !file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
        return callback(new common_1.HttpException('image must be jpg|jpeg|png|gif', common_1.HttpStatus.FORBIDDEN), false);
    }
    else if ((file === null || file === void 0 ? void 0 : file.fieldname) == 'pdf' && !file.originalname.match(/\.(pdf)$/)) {
        return callback(new common_1.HttpException('book must be of type pdf document', common_1.HttpStatus.FORBIDDEN), false);
    }
    callback(null, true);
};
exports.PDF_ImageInterceptor = PDF_ImageInterceptor;
const FileTypeInterceptor = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
        return callback(new common_1.HttpException('Only jpg/jpeg/png/pdf files are allowed!', common_1.HttpStatus.FORBIDDEN), false);
    }
    callback(null, true);
};
exports.FileTypeInterceptor = FileTypeInterceptor;
const FileImageTypeInterceptor = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf)$/))
        callback(null, true);
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
        return callback(new common_1.HttpException('Only image files are allowed!', common_1.HttpStatus.FORBIDDEN), false);
    }
    callback(null, true);
};
exports.FileImageTypeInterceptor = FileImageTypeInterceptor;
const FilePDFTypeInterceptor = (req, file, callback) => {
    console.log('pdf => ', file);
    if (!file.originalname.match(/\.(pdf)$/)) {
        return callback(new common_1.HttpException('Only pdf files are allowed!', common_1.HttpStatus.FORBIDDEN), false);
    }
    callback(null, true);
};
exports.FilePDFTypeInterceptor = FilePDFTypeInterceptor;
//# sourceMappingURL=file-type.interceptor.js.map