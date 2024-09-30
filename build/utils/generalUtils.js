"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isNumber = exports.isString = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isNumber = (number) => {
    return typeof number === 'number';
};
exports.isNumber = isNumber;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
