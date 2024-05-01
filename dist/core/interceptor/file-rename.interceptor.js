"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRenameInterceptor = void 0;
const path_1 = require("path");
const FileRenameInterceptor = ({ body }, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.FileRenameInterceptor = FileRenameInterceptor;
//# sourceMappingURL=file-rename.interceptor.js.map