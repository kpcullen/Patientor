"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/types");
const generalUtils_1 = require("./generalUtils");
const parseDate = (date) => {
    if (!(0, generalUtils_1.isString)(date) || !(0, generalUtils_1.isDate)(date)) {
        throw new Error('Date is missing or incorrect ' + date);
    }
    return date;
};
const parseDescription = (description) => {
    if (!(0, generalUtils_1.isString)(description)) {
        throw new Error('Description is missing or incorrect ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!(0, generalUtils_1.isString)(specialist)) {
        throw new Error('Specialist is missing or incorrect ' + specialist);
    }
    return specialist;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating)
        .map((rating) => rating)
        .includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!(0, generalUtils_1.isNumber)(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Health Check Rating is invalid');
    }
    return healthCheckRating;
};
const parseCriteria = (text) => {
    if (!(0, generalUtils_1.isString)(text)) {
        throw new Error('Discharge criteria invalid');
    }
    return text;
};
const isDischarge = (discharge) => {
    return (typeof discharge === 'object' &&
        discharge !== null &&
        'date' in discharge &&
        'criteria' in discharge);
};
const parseEmployerName = (text) => {
    if (!(0, generalUtils_1.isString)(text)) {
        throw new Error('Employer name is invalid');
    }
    return text;
};
const isType = (text) => {
    return Object.values(types_1.EntryType).includes(text);
};
const parseType = (text) => {
    if (!isType(text)) {
        throw new Error('Invalid entry type');
    }
    return text;
};
const toNewEntry = (object) => {
    var _a, _b;
    if (!object || typeof object !== 'object') {
        throw new Error('Data is incorrect or fields are missing');
    }
    if ('date' in object &&
        'description' in object &&
        'specialist' in object &&
        'type' in object) {
        const baseNewEntry = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: parseType(object.type),
        };
        switch (object.type) {
            case 'Hospital': {
                if (!('discharge' in object) || !isDischarge(object.discharge)) {
                    throw new Error('Discharge info missing');
                }
                return Object.assign(Object.assign({}, baseNewEntry), { discharge: {
                        date: parseDate(object.discharge.date),
                        criteria: parseCriteria(object.discharge.criteria),
                    } });
            }
            case 'OccupationalHealthcare': {
                if (!('employerName' in object)) {
                    throw new Error('Missing employer name');
                }
                return Object.assign(Object.assign(Object.assign({}, baseNewEntry), { employerName: parseEmployerName(object.employerName) }), (((_a = object === null || object === void 0 ? void 0 : object.sickLeave) === null || _a === void 0 ? void 0 : _a.startDate) &&
                    ((_b = object === null || object === void 0 ? void 0 : object.sickLeave) === null || _b === void 0 ? void 0 : _b.endDate) && {
                    sickLeave: {
                        startDate: parseDate(object.sickLeave.startDate),
                        endDate: parseDate(object.sickLeave.endDate),
                    },
                }));
            }
            case 'HealthCheck': {
                if (!('healthCheckRating' in object)) {
                    throw new Error('Health check rating is missing');
                }
                return Object.assign(Object.assign({}, baseNewEntry), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
            }
        }
    }
    throw new Error('Incorrect data: some fields missing');
};
exports.default = toNewEntry;
