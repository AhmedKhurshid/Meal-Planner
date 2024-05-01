"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = require("dotenv");
const dotenv_parse_1 = require("dotenv-parse");
let env = (0, dotenv_1.config)({});
if (env.error)
    throw env.error;
env = (0, dotenv_parse_1.parse)(env.parsed);
exports.ENV = env;
//# sourceMappingURL=SetEnvironmentVariables.js.map