"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderName = exports.FileName = void 0;
const FileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = '.' + file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.FileName = FileName;
const FolderName = (req, file, callback) => {
    const path = req.params.path;
    callback(null, `public/${path}`);
};
exports.FolderName = FolderName;
//# sourceMappingURL=getFileName.js.map