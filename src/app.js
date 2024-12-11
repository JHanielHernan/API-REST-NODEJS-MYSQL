//ROUTERS
import {default as ProjectoRouter} from './routes/projectRouter.js';
import {default as TareasRouter} from './routes/tareasRouter.js';

//EXPRESS
import express from 'express';
const app = express();

app.use(express.json());

app.use('/tareas',TareasRouter);
app.use('/projectos',ProjectoRouter);

app.listen(300,()=>{
    console.log("http://localhost:300");
})
