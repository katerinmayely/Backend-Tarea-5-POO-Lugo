import mongoose from 'mongoose';

export interface Categoria{
    _id: mongoose.Types.ObjectId;
    nombreCategoria: string;
    descripcion: string;
    color: string;
    icono: string;
    empresas: Array<number>
}