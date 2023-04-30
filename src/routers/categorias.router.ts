import express from 'express';
import { getCategorias, obtenerEmpresas, getCategoria, obtenerProducto, addCategoria } from '../controllers/categorias.controller';

const router = express.Router();

router.get('/', getCategorias);
router.post('/', addCategoria);
router.get('/:_id', getCategoria);
router.get('/:_id/empresas', obtenerEmpresas);
router.get('/:_id/empresas/:idEmpresa/productos/:idProducto', obtenerProducto);

export default router;