"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModuleRootAsync = exports.TypeOrmModuleRoot = exports.typeOrmModuleOptions = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const constant_1 = require("../constant");
const entities_1 = require("../entities/entities");
const typeORMGeneralOptions = {
    type: constant_1.ENV.DB_TYPE,
    host: constant_1.ENV.DB_HOST,
    port: constant_1.ENV.DB_PORT,
    username: constant_1.ENV.DB_USERNAME,
    password: constant_1.ENV.DB_PASSWORD,
    database: constant_1.ENV.DB_DATABASE,
    entities: [...entities_1.baseEntities, ...entities_1.entities],
    retryDelay: 10000,
    retryAttempts: 2,
    logging: true,
    synchronize: constant_1.ENV.DB_SYNC,
    dropSchema: constant_1.ENV.DB_DROP,
};
exports.typeOrmModuleOptions = Object.assign(Object.assign({}, typeORMGeneralOptions), { synchronize: true, dropSchema: true });
const typeOrmModuleAsyncOptions = {
    useFactory: async () => {
        return Object.assign(Object.assign({}, typeORMGeneralOptions), { migrations: [
                constant_1.ENV.TYPEORM_MIGERATION + '**.migeration.js'
            ], cli: {
                migerationDir: constant_1.ENV.TYPEORM_MIGERATION
            }, extra: {
                charset: 'utf8_unicode_ci',
            } });
    }
};
exports.TypeOrmModuleRoot = typeorm_1.TypeOrmModule.forRoot(exports.typeOrmModuleOptions);
exports.TypeOrmModuleRootAsync = typeorm_1.TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions);
//# sourceMappingURL=ConfigTypeORM.js.map