"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const esquema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    idUsuario: Number,
    nombre: String,
    apellido: String,
    ordenes: (Array)
});
exports.UsuarioSchema = mongoose_1.default.model('usuarios', esquema);
