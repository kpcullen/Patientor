"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisServices_1 = __importDefault(require("../services/diagnosisServices"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diagnosisServices_1.default.getDiagnoses());
});
exports.default = router;
