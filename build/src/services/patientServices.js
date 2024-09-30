"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatientEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    const patient = patients_1.default.find((patient) => patient.id === id);
    console.log(patient);
    return patient;
};
const addEntry = (entry, id) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    console.log(newEntry);
    const patient = patients_1.default.find((patient) => patient.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    if (!patient.entries) {
        patient.entries = [newEntry];
    }
    patient.entries = [...patient.entries, newEntry];
    return newEntry;
};
exports.default = {
    getPatients,
    getNonSensitivePatientEntries,
    addPatient,
    getPatient,
    addEntry,
};
