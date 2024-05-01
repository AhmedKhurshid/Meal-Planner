"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSession = void 0;
const session = require("express-session");
exports.configSession = session({
    name: 'NESTJS_SESSION_ID_AHMED',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    },
});
//# sourceMappingURL=ConfigSession.js.map