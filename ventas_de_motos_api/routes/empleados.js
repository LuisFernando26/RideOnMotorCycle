const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

//creamos la ruta y llamamos a los controladores 
router.get('/obtenerEmpleados', empleadosController.obtenerEmpleados);
router.post('/validarEmpleados', empleadosController.validarEmpleadosPorCorreo);
router.post('/registrarEmpleados', empleadosController.registrarEmpleados);
router.put('/actEmpleados', empleadosController.actualizarEmpleados);
router.delete('/eliEmpleados', empleadosController.eliminarEmpleados);



module.exports = router;