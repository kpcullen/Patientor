"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const patientUtils_1 = __importDefault(require("../../utils/patientUtils"));
const entryUtils_1 = __importDefault(require("../../utils/entryUtils"));
const router = (0, express_1.default)();
router.get('/', (_req, res) => {
    res.send(patientServices_1.default.getNonSensitivePatientEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, patientUtils_1.default)(req.body);
        const addedPatient = patientServices_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (err) {
        let errorMessage = 'Something went wrong';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const patientInfo = patientServices_1.default.getPatient(id);
        res.send(patientInfo);
    }
    catch (_a) {
        res.status(404).send({ error: 'Patient not found' });
    }
});
router.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    try {
        const newEntry = (0, entryUtils_1.default)(req.body);
        const addedEntry = patientServices_1.default.addEntry(newEntry, id);
        res.json(addedEntry);
    }
    catch (err) {
        let errorMessage = 'Something went wrong';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
