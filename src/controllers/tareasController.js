import { number, z } from 'zod';  // Esto importa Zod para usarlo
import { pool } from "../database/connectionMySQL.js";
import { TareasSchema , TareaEstadoSchema, ActuTareasSchema} from '../validate/tareasValidate.js';

export const GetTarea = async (req,res)=>{

    try{
        const [respuesta] = await pool.query('SELECT * FROM tasks');
        if(respuesta.length > 0) return  res.json(respuesta);
        res.status(200).json({message:"No existen tareas aún"});
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const GetIdTarea = async (req,res)=>{
    const {id} = req.params;

    try{
        const [respuesta] = await pool.query('SELECT * FROM tasks WHERE id = ?',[Number(id)]);
        if(respuesta.length > 0) return  res.json(respuesta[0]);
        res.status(200).json({message:"No existe una tarea con ese ID aún"});
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}

export const CrearTarea = async (req,res)=>{
    try{
        req.body.fecha_vencimiento = new Date(req.body.fecha_vencimiento);
        const Tarea = TareasSchema.parse(req.body);
        
        const projectId = Number(Tarea.project_id);
        if (isNaN(projectId)) { 
            return res.status(400).json({ message: 'ID de proyecto inválido' }); 
        }
        //Verificar si existe el projectos
        const [VerificarID] = await pool.query("SELECT * FROM projects WHERE id = ?",[projectId]);
        if(VerificarID.length > 0){
            const [result] = await pool.query("INSERT INTO tasks ( titulo, descripcion, estado, fecha_vencimiento, project_id) VALUES (?,?,?,?,?)",
                [Tarea.titulo, Tarea.descripcion, Tarea.estado,  Tarea.fecha_vencimiento,projectId]
            );
            return res.json({message:'Tarea ingresada exitosamente'});
        }
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message: exception.message});
    }
}

export const ActualizarTarea = async (req,res)=>{
    try{
        req.body.fecha_vencimiento = new Date(req.body.fecha_vencimiento);
        const Tarea = ActuTareasSchema.parse(req.body);
        const projectId = Number(Tarea.project_id);
        if (isNaN(projectId)) { 
            return res.status(400).json({ message: 'ID de proyecto inválido' }); 
        }
        //Verificar si existe el projectos
        const [VerificarID] = await pool.query("SELECT * FROM projects WHERE id = ?",[projectId]);
        if(VerificarID.length > 0){
            const [result] = await pool.query("UPDATE tasks SET titulo = ?,descripcion = ?, estado = ?, fecha_vencimiento = ? , project_id = ? WHERE id = ? ",
                [Tarea.titulo, Tarea.descripcion, Tarea.estado,  Tarea.fecha_vencimiento,projectId, Number(Tarea.id)]
            );
            return res.json({message:'Tarea actualizada exitosamente'});
        }
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message: exception.message});
    }
}

export const ActualizarEstado = async (req,res)=>{
    try{
        const Tarea = TareaEstadoSchema.parse(req.body);
        
        const [result] = await pool.query("UPDATE tasks SET estado = ? WHERE id = ?",
            [Tarea.estado, Number(Tarea.id)]
        );
        return res.json({message:'Estado actualizado correctamente'});
    }catch(exception){
        if(exception instanceof z.ZodError){
            return res.status(400).json({ errores: exception.errors });
        }
        res.status(404).json({message: exception.message});
    }
}

export const EliminarTarea = async (req,res)=>{
    const {Id} = req.params;
    try{
        if(Id){
            await pool.query("DELETE FROM tasks WHERE id = ?",[Number(Id)]);
            return res.json({message:"Tarea eliminada"});
        }
        res.status(404).json({message:"se necesita el id"});        
    }catch(exception){
        res.status(404).json({message:exception.message});
    }
}