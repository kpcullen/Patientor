"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/types");
const generalUtils_1 = require("./generalUtils");
const parseName = (name) => {
    if (!(0, generalUtils_1.isString)(name)) {
        throw new Error('Incorrect of missing name');
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!(0, generalUtils_1.isString)(date) || !(0, generalUtils_1.isDate)(date)) {
        throw new Error('Date of birth is missing or inccorect: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!(0, generalUtils_1.isString)(ssn)) {
        throw new Error('SSN is missing or incorrect');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!(0, generalUtils_1.isString)(gender) || !isGender(gender)) {
        throw new Error('Gender is missing or incorrect');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!(0, generalUtils_1.isString)(occupation)) {
        throw new Error('Occupation is missing or incorrect');
    }
    return occupation;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Data is incorrect or fields are missing');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields missing');
};
exports.default = toNewPatient;
