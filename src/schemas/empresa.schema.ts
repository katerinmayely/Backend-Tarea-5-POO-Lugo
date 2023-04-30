import mongoose from 'mongoose';
import { Empresa, Producto } from '../models/empresa.model';

const schema = new mongoose.Schema<Empresa>({
    _id: mongoose.Types.ObjectId,
    idEmpresa: Number,
    nombreEmpresa: String,
    imagen: String,
    productos: Array<Producto>
})

export const EmpresaSchema = mongoose.model('empresas', schema);