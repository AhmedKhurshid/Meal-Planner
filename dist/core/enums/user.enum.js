"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEM = exports.VENDORSTATUS = exports.TIME = exports.DAYS = exports.ORDER = exports.UPLOAD_PATH = exports.STATUS = exports.ROLE = exports.GENDER = void 0;
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "Male";
    GENDER["FEMALE"] = "Female";
    GENDER["NONE"] = "None";
    GENDER["OTHER"] = "I Prefer not to say";
})(GENDER || (exports.GENDER = GENDER = {}));
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "Admin";
    ROLE["STUDENT"] = "Student";
    ROLE["STAFF"] = "Staff";
})(ROLE || (exports.ROLE = ROLE = {}));
var STATUS;
(function (STATUS) {
    STATUS["NONE"] = "None";
    STATUS["ACTIVE"] = "Active";
    STATUS["REJECT"] = "Reject";
    STATUS["PENDING"] = "Pending";
    STATUS["BLOCK"] = "Block";
    STATUS["CANCEL"] = "Cancel";
})(STATUS || (exports.STATUS = STATUS = {}));
var UPLOAD_PATH;
(function (UPLOAD_PATH) {
    UPLOAD_PATH["DOC"] = "docoument";
    UPLOAD_PATH["IMAGE"] = "image";
})(UPLOAD_PATH || (exports.UPLOAD_PATH = UPLOAD_PATH = {}));
var ORDER;
(function (ORDER) {
    ORDER["ASC"] = "ASC";
    ORDER["DESC"] = "DESC";
})(ORDER || (exports.ORDER = ORDER = {}));
var DAYS;
(function (DAYS) {
    DAYS["MONDAY"] = "Monday";
    DAYS["TUESDAY"] = "Tuesday";
    DAYS["WEDNESDAY"] = "Wednesday";
    DAYS["THURSDAY"] = "Thursday";
    DAYS["FRIDAY"] = "Friday";
    DAYS["SATURDAY"] = "Saturday";
    DAYS["SUNDAY"] = "Sunday";
})(DAYS || (exports.DAYS = DAYS = {}));
var TIME;
(function (TIME) {
    TIME["AM9"] = "09:00:00";
    TIME["AM10"] = "10:00:00";
    TIME["AM11"] = "11:00:00";
    TIME["PM12"] = "12:00:00";
    TIME["PM1"] = "13:00:00";
    TIME["PM2"] = "14:00:00";
    TIME["PM3"] = "15:00:00";
    TIME["PM4"] = "16:00:00";
    TIME["PM5"] = "17:00:00";
})(TIME || (exports.TIME = TIME = {}));
var VENDORSTATUS;
(function (VENDORSTATUS) {
    VENDORSTATUS["PENDING"] = "Pending";
    VENDORSTATUS["ACTIVE"] = "Active";
})(VENDORSTATUS || (exports.VENDORSTATUS = VENDORSTATUS = {}));
var ITEM;
(function (ITEM) {
    ITEM["INACTIVE"] = "Inactive";
    ITEM["ACTIVE"] = "Active";
})(ITEM || (exports.ITEM = ITEM = {}));
//# sourceMappingURL=user.enum.js.map