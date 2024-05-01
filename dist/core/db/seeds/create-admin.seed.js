"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../constant");
const entities_1 = require("../../entities");
const enums_1 = require("../../enums");
class CreateAdminSeed {
    async run(factory, connection) {
        const insert = connection.createQueryBuilder().insert();
        await insert.into(entities_1.User).values({
            name: 'Admin',
            phone: '03212827700',
            email: 'ahmedsoftengineer@gmail.com',
            password: await constant_1.argon.hash('Password@123'),
            gender: enums_1.GENDER.MALE,
            role: enums_1.ROLE.ADMIN,
            status: enums_1.STATUS.ACTIVE,
            address: 'Admin Address',
        }).execute();
    }
}
exports.default = CreateAdminSeed;
//# sourceMappingURL=create-admin.seed.js.map