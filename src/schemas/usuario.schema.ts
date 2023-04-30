import mongoose from 'mongoose';
import {Usuario, Orden} from '../models/usuario.model';

const esquema = new mongoose.Schema<Usuario>({
    _id: mongoose.Types.ObjectId,
    idUsuario: Number,
    nombre: String,
    apellido: String,
    ordenes: Array<Orden>
})

export const UsuarioSchema = mongoose.model('usuarios', esquema);