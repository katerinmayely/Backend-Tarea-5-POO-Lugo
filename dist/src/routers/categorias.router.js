"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categorias_controller_1 = require("../controllers/categorias.controller");
const router = express_1.default.Router();
router.get('/', categorias_controller_1.getCategorias);
router.post('/', categorias_controller_1.addCategoria);
router.get('/:_id', categorias_controller_1.getCategoria);
router.get('/:_id/empresas', categorias_controller_1.obtenerEmpresas);
router.get('/:_id/empresas/:idEmpresa/productos/:idProducto', categorias_controller_1.obtenerProducto);
exports.default = router;
