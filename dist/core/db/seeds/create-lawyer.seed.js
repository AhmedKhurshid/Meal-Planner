"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../../constant");
const entities_1 = require("../../entities");
const enums_1 = require("../../enums");
class CreateLawyerSeed {
    async run(factory, connection) {
        const insert = connection.createQueryBuilder().insert();
        const student = await insert.into(entities_1.User).values({
            name: 'Student',
            email: 'ssyedahmed31@gmail.com',
            password: await constant_1.argon.hash('Password@123'),
            gender: enums_1.GENDER.MALE,
            role: enums_1.ROLE.STUDENT,
            status: enums_1.STATUS.ACTIVE,
            address: 'Student Address',
            image: 'Student-image.jpg',
        }).execute();
        console.log({ student });
    }
}
exports.default = CreateLawyerSeed;
//# sourceMappingURL=create-lawyer.seed.js.map