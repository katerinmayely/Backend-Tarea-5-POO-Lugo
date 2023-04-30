"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bd = 'lugo';
const host = '127.0.0.1';
const port = '27017';
class Database {
    constructor() {
        this.conectar();
    }
    conectar() {
        mongoose_1.default.connect(`mongodb://${host}:${port}/${bd}`)
            .then(result => {
            console.log('Se conectó a MongoDB.');
        }).catch(error => {
            console.log('Hubo un error de conexión.');
        });
    }
}
exports.Database = Database;
