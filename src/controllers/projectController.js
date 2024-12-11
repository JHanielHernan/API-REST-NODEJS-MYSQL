import { z } from 'zod';  // Esto importa Zod para usarlo
import { pool } from "../database/connectionMySQL.js";
import { ProjectoSchema , ProjectoIDSchema} from "../validate/projectValidate.js";

export const GetProjecto = async (req,res)=>{
    try{
        const  [result] = await pool.query("SELECT * FROM projects");
        if(result.length > 0) return res.json(result);
        res.status(204).json({message:"Sin projectos"});
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const GetIdProjecto = async(req,res)=>{
    const {id} = req.params;
    try{
        const  [result] = await pool.query("SELECT * FROM projects WHERE id = ?",[Number(id)]);
        res.json(result[0]);
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const CrearProjecto = async(req,res)=>{
    try{
        req.body.fecha_inicio = new Date(req.body.fecha_inicio);
        req.body.fecha_finalizacion = new Date(req.body.fecha_finalizacion);
        const Proyecto = ProjectoSchema.parse(req.body);
        const respuesta = await pool.query("INSERT INTO projects (nombre, descripcion, fecha_inicio, fecha_finalizacion,estado) VALUES (?,?,?,?,?)",
             [Proyecto.nombre,Proyecto.descripcion,Proyecto.fecha_inicio,Proyecto.fecha_finalizacion,Proyecto.estado]);
        res.status(201).json({message:"Projecto registrado"});
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }

        res.status(500).json({error: exception.message});
    }
}


export const ActualizarProyecto = async(req,res)=>{
    const {id} = req.params;
    req.body.fecha_inicio = new Date(req.body.fecha_inicio);
    req.body.fecha_finalizacion = new Date(req.body.fecha_finalizacion);
    const Proyecto = ProjectoSchema.parse(req.body);
    try{
        const  [result] = await pool.query("UPDATE projects SET nombre = ?, descripcion = ? , fecha_inicio = ?, fecha_finalizacion = ?, estado = ? where id = ?",
            [ Proyecto.nombre, Proyecto.descripcion, Proyecto.fecha_inicio, Proyecto.fecha_finalizacion, Proyecto.estado,Number(id)]);
            res.status(201).json({message:"Projecto actualizado"});
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message:exception.message});
    }
}

export const EliminarProjecto = async(req,res)=>{
    const {id} = req.params;

    try{
        const [result] = await pool.query("DELETE FROM projects WHERE id = ?" , [Number(id)]);
        res.status(201).json({message:"Projecto Eliminado"});
    }catch(exception){
        res.status(404).json({error:exception.error});
    }
}