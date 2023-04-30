"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categorias_router_1 = __importDefault(require("./src/routers/categorias.router"));
const usuarios_router_1 = __importDefault(require("./src/routers/usuarios.router"));
const database_1 = require("./src/utils/database");
const app = (0, express_1.default)();
const db = new database_1.Database();
//Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('./src/public'));
app.use('/categorias', categorias_router_1.default);
app.use('/usuarios', usuarios_router_1.default);
app.get('/', (req, res) => {
    res.send('Lugo Backend');
});
app.listen(5000, () => {
    console.log('Servidor Levantado en el puerto 5000');
});
