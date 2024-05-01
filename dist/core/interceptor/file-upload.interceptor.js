"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interceptor_Files_PDF_Image = exports.InterceptorPDF = exports.InterceptorImage = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const index_1 = require("./index");
const limits = {
    fileSize: 1024 * 2048,
    files: 1,
};
exports.InterceptorImage = (0, platform_express_1.FileInterceptor)('image', {
    storage: (0, multer_1.diskStorage)({
        filename: index_1.FileRenameInterceptor,
    }),
    fileFilter: index_1.FileImageTypeInterceptor,
    limits,
});
exports.InterceptorPDF = (0, platform_express_1.FileInterceptor)('pdf', {
    storage: (0, multer_1.diskStorage)({
        destination: 'public',
        filename: index_1.FileRenameInterceptor,
    }),
    fileFilter: index_1.FilePDFTypeInterceptor,
    limits,
});
exports.Interceptor_Files_PDF_Image = (0, platform_express_1.FileFieldsInterceptor)([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
], {
    dest: 'public',
    storage: (0, multer_1.diskStorage)({
        destination: 'public',
        filename: index_1.FileRenameInterceptor,
    }),
    fileFilter: index_1.PDF_ImageInterceptor,
    limits: {
        fileSize: 1024 * 2048,
        files: 2,
    },
});
//# sourceMappingURL=file-upload.interceptor.js.map