const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

//creamos la ruta y llamamos a los controladores 
router.get('/obtenerClientes', clientesController.obtenerClientes);
router.post('/validarClientes',clientesController.validarClientesPorCorreo);
router.post('/registrarClientes', clientesController.registrarClientes);
router.put('/actClientes', clientesController.actualizarClientes);
router.delete('/eliClientes', clientesController.eliminarClientes);

module.exports = router;