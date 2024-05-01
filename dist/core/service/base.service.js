"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const promises_1 = require("fs/promises");
const core_service_1 = require("./core.service");
const ResponseModel_1 = require("../common/ResponseModel");
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
class BaseService extends core_service_1.CoreService {
    findAll() {
        return this.repo.find() || { message: `record does not exsist` };
    }
    findOne(id) {
        return this.repo.findOneBy({ id }).then((data) => {
            return data || { message: `id ${id} does not exsist` };
        });
    }
    createSimple(data) {
        const result = this.repo.create(data);
        return this.repo.save(result);
    }
    async updateSimple(id, data, cb = null) {
        let result = await this.findOne(id);
        if (cb)
            await cb(result, data);
        if (result)
            result = await this.repo.update(id, data);
        const res = new ResponseModel_1.ResponseData();
        res.statusCode = common_1.HttpStatus.OK;
        res.message = [enums_1.RESPOSE_CODE_MESSAGE.UPDATE];
        return res || { message: `id ${id} does not exsist` };
    }
    remove(id) {
        return this.repo.delete({ id });
    }
    delFile(filename) {
        return (0, promises_1.unlink)('public/' + filename).catch(console.log);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map