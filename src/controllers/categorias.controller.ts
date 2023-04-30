import { Request, Response } from "express";
import { CategoriaSchema } from "../schemas/categoria.schema";
import { EmpresaSchema } from "../schemas/empresa.schema";
import mongoose from 'mongoose';

export const getCategorias = (req:Request, res:Response) => {
    CategoriaSchema.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        console.error(error);
    })
} 

export const getCategoria = (req:Request, res:Response) => {
    CategoriaSchema.find({_id: req.params._id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        console.error(error);
    })
} 

export const obtenerEmpresas = (req:Request, res:Response) => {
    CategoriaSchema.aggregate([
        {
            $lookup: {
                from: "empresas",
                localField: "empresas",
                foreignField: "idEmpresa",
                as: "empresas"
            }
        },
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params._id)
            }
        },
        {
            $project: {
                _id: true,
                idEmpresa: true,
                nombreEmpresa: true,
                imagen: true,
                productos: true,
                empresas: true
            }
        }
    ]).then(result => {
        res.send(result[0].empresas);
    }).catch(error => {
        res.send(error);
    })
}

export const obtenerProducto = (req:Request, res:Response) => {
    CategoriaSchema.aggregate([
        {
            $lookup: {
                from: "empresas",
                localField: "empresas",
                foreignField: "idEmpresa",
                as: "empresas"
            }
        },
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params._id)
            }
        },
        {
            $project: {
                _id: true,
                idEmpresa: true,
                nombreEmpresa: true,
                imagen: true,
                productos: true,
                empresas: true
            }
        }
    ]).then(result => {
        res.send(result[0].empresas[req.params.idEmpresa].productos[req.params.idProducto]);
    }).catch(error => {
        res.send(error);
    })
};

export const addCategoria = (req:Request, res:Response) => {

    const nvaCategoria = new CategoriaSchema({
        nombreCategoria: req.body.nombreCategoria,
        descripcion: req.body.descripcion,
        color: req.body.color,
        icono: req.body.icono,
        empresas: []
    });
    
    nvaCategoria.save().then(result => {
        res.send('Se guardó');
        res.end();
    }).catch(error => {
        res.send('Ocurrió un error');
    });
} ;