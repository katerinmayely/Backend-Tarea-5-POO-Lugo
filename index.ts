import express, {Request, Response, Express} from 'express';
import categoriasRouter from './src/routers/categorias.router';
import usuariosRouter from './src/routers/usuarios.router';
import {Database} from './src/utils/database';
import bodyParser from 'body-parser';

const app:Express = express();
const db:Database = new Database();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'));

app.use('/categorias', categoriasRouter);
app.use('/usuarios', usuariosRouter);

app.get('/', (req:Request, res:Response) => {
    res.send('Lugo Backend');
})

app.listen(5000, () => {
    console.log('Servidor Levantado en el puerto 5000');
})