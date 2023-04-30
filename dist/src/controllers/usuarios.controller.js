"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrden = exports.getOrdenes = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_schema_1 = require("../schemas/usuario.schema");
const getUsuarios = (req, res) => {
    usuario_schema_1.UsuarioSchema.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        console.error(error);
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    usuario_schema_1.UsuarioSchema.find({ idUsuario: req.params.id }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        console.error(error);
    });
};
exports.getUsuario = getUsuario;
const getOrdenes = (req, res) => {
    usuario_schema_1.UsuarioSchema.find({ idUsuario: req.params.id }).then(result => {
        res.send(result[0].ordenes);
        res.end();
    }).catch(error => {
        console.error(error);
    });
};
exports.getOrdenes = getOrdenes;
const addOrden = (req, res) => {
    usuario_schema_1.UsuarioSchema.updateOne({ idUsuario: req.params.id }, { $push: { 'ordenes': {
                nombreProducto: req.body.nombreProducto,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                precio: req.body.precio
            } }
    }).then(result => {
        res.send({ mensaje: 'Pedido agregado', result });
        res.end();
    }).catch(error => {
        console.error(error);
    });
};
exports.addOrden = addOrden;
