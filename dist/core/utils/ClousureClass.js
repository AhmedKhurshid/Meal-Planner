"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findAll = void 0;
function findAll() {
    return this.repo.find() || { message: `record does not exsist` };
}
exports.findAll = findAll;
function findOne(id) {
    return this.repo.findOneBy({ id }).then((data) => {
        return data || { message: `id ${id} does not exsist` };
    });
}
exports.findOne = findOne;
//# sourceMappingURL=ClousureClass.js.map