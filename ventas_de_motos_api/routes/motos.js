const express = require('express');
const router = express.Router();
const motosController = require('../controllers/motosController');


//creamos la ruta y llamamos a los controladores 
router.get('/obtenerMotos', motosController.obtenerMotos);
router.post('/registrarMotos', motosController.registrarMotos);
router.put('/actualizarMotos', motosController.actualizarMotos);
router.put('/eliminarMotos', motosController.eliminarMotos);
module.exports = router;