import mongoose from 'mongoose';
import { Categoria } from '../models/categoria.model';

const schema = new mongoose.Schema<Categoria>({
    nombreCategoria: String,
    descripcion: String,
    color: String,
    icono: String,
    empresas: Array<Number>
})

export const CategoriaSchema = mongoose.model('categorias', schema);