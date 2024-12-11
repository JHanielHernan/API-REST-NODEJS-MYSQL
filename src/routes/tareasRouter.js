//CONTROLLER
import * as Controller from '../controllers/tareasController.js';

//EXPRESS
import express from 'express';
const router = express.Router();


router.get('/',Controller.GetTarea);
router.get('/:id',Controller.GetIdTarea);
router.post('/',Controller.CrearTarea);
router.put('/',Controller.ActualizarTarea);
router.patch('/',Controller.ActualizarEstado);

export default router;