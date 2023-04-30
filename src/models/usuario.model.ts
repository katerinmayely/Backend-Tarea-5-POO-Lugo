import mongoose from 'mongoose';

export interface Orden{
    nombreProducto: string,
    descripcion: string,
    cantidad: number,
    precio: number
}

export interface Usuario{
    _id: mongoose.Types.ObjectId,
    idUsuario: number,
    nombre: string,
    apellido: string,
    ordenes: Array<Orden>
}