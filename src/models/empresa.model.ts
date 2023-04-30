import mongoose from 'mongoose';

export interface Producto{
    nombreProducto: string,
    descripcion: string,
    precio: number
}

export interface Empresa{
    _id: mongoose.Types.ObjectId;
    idEmpresa: number,
    nombreEmpresa: string,
    imagen: string,
    productos: Array<Producto>
}