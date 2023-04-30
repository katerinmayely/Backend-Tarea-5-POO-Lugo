import {Request, Response} from 'express';
import { UsuarioSchema } from '../schemas/usuario.schema';

export const getUsuarios = (req:Request, res:Response) => {
    UsuarioSchema.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        console.error(error);
    })
}

export const getUsuario = (req:Request, res:Response) => {
    UsuarioSchema.find({idUsuario: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        console.error(error);
    })
}

export const getOrdenes = (req:Request, res:Response) => {
    UsuarioSchema.find({idUsuario: req.params.id}).then(result => {
        res.send(result[0].ordenes);
        res.end();
    }).catch(error => {
        console.error(error);
    })
}

export const addOrden = (req:Request, res:Response) => {
    UsuarioSchema.updateOne({idUsuario: req.params.id}, 
        {$push: {'ordenes': {
            nombreProducto: req.body.nombreProducto,
            descripcion:req.body.descripcion,
            cantidad: req.body.cantidad,
            precio: req.body.precio
        }}
    }).then(result => {
        res.send({mensaje: 'Pedido agregado', result});
        res.end();
    }).catch(error => {
        console.error(error);
    })
}