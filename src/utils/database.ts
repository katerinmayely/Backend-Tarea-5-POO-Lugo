import mongoose from 'mongoose';

const bd:string = 'lugo';
const host:string = '127.0.0.1';
const port:string = '27017';

export class Database{
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect(`mongodb://${host}:${port}/${bd}`)
        .then(result => {
            console.log('Se conectó a MongoDB.');
        }).catch( error => {
            console.log('Hubo un error de conexión.');
        })
    }
}
