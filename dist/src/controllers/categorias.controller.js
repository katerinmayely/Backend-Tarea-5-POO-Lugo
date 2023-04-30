"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoria = exports.obtenerProducto = exports.obtenerEmpresas = exports.getCategoria = exports.getCategorias = void 0;
const categoria_schema_1 = require("../schemas/categoria.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const getCategorias = (req, res) => {
    categoria_schema_1.CategoriaSchema.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        console.error(error);
    });
};
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => {
    categoria_schema_1.CategoriaSchema.find({ _id: req.params._id }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        console.error(error);
    });
};
exports.getCategoria = getCategoria;
const obtenerEmpresas = (req, res) => {
    categoria_schema_1.CategoriaSchema.aggregate([
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
                _id: new mongoose_1.default.Types.ObjectId(req.params._id)
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
    });
};
exports.obtenerEmpresas = obtenerEmpresas;
const obtenerProducto = (req, res) => {
    categoria_schema_1.CategoriaSchema.aggregate([
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
                _id: new mongoose_1.default.Types.ObjectId(req.params._id)
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
    });
};
exports.obtenerProducto = obtenerProducto;
const addCategoria = (req, res) => {
    const nvaCategoria = new categoria_schema_1.CategoriaSchema({
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
};
exports.addCategoria = addCategoria;
