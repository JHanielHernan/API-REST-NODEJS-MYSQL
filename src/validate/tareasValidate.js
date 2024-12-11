import {z} from 'zod';

export const ActuTareasSchema = z.object({
    id:z.number(),
    titulo : z
    .string()
    .min(1,'El Titulo es obligatorio.')
    .max(255,'No debe sobrepasar 200 caracteres'),
    descripcion : z
    .string()
    .min(1,'La descripción es obligatoria'),
    estado : z
    .enum(['pendiente','completada']),
    fecha_vencimiento : z.date(),
    project_id : z.number().positive().min(1)
});

export const TareasSchema = z.object({
    titulo : z
    .string()
    .min(1,'El Titulo es obligatorio.')
    .max(255,'No debe sobrepasar 200 caracteres'),
    descripcion : z
    .string()
    .min(1,'La descripción es obligatoria'),
    estado : z
    .enum(['pendiente','completada']),
    fecha_vencimiento : z.date(),
    project_id : z.number().positive().min(1)
});

export const TareaEstadoSchema = z.object({
    id:z.number(),
    estado : z
    .enum(['pendiente','completada'])
});


