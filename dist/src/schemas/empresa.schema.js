"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    idEmpresa: Number,
    nombreEmpresa: String,
    imagen: String,
    productos: (Array)
});
exports.EmpresaSchema = mongoose_1.default.model('empresas', schema);
