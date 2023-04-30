import express from 'express';
import { getUsuarios, getUsuario, getOrdenes, addOrden } from '../controllers/usuarios.controller';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.get('/:id/ordenes', getOrdenes);
router.put('/:id', addOrden);

export default router;