import {z} from 'zod';


export const ProjectoSchema = z.object({
    nombre: z
    .string()
    .min(4,'El nombre es obligatorio.')
    .max(100,'El nombre no puede tener más de 25 caracteres.'),
    descripcion: z
    .string()
    .min(2,'Debe tener mas de 2 caracteres almenos'),
    fecha_inicio: z.date(),
    fecha_finalizacion:z.date(),
    estado: z
    .enum(['activo','completado','pendiente'])
});

export const ProjectoIDSchema = z.object({
    id:z
    .number().positive('El ID debe ser positivo').min(1)
});