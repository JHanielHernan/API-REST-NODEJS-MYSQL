//CONTROLLER
import * as Controller from '../controllers/projectController.js';

//EXPRESS
import express from 'express';
const router = express.Router();

router.get('/', Controller.GetProjecto);
router.get('/:id', Controller.GetIdProjecto);
router.post('/',Controller.CrearProjecto);
router.put('/:id',Controller.ActualizarProyecto);
router.delete('/:id',Controller.EliminarProjecto);

export default router;