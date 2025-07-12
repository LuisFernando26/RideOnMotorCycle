const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');


//creamos la ruta y llamamos a los controladores 
router.get('/obtenerVentas', ventasController.obtenerVentas);
router.post('/obtenerVentasporID', ventasController.obtenerVentasporID);
router.post('/registrarVentas', ventasController.registrarVentas);
router.put('/actualizarVentas', ventasController.actualizarVentas);
router.delete('/eliminarVentas',ventasController.eliminarVentas);

//ruta de prueba de ver historial
router.get('/verTodasLasVentas',ventasController.obtenerVentasConDetalles);


module.exports = router;