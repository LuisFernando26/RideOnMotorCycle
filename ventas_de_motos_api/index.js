const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const empleadosroutes = require('./routes/empleados');
const clientesroutes = require('./routes/clientes');
const motosroutes = require('./routes/motos');
const ventasroutes = require('./routes/ventas');

app.use(cors());
app.use(express.json());

//api empleados
app.use('/api/empleados', empleadosroutes);

//api clientes
app.use('/api/clientes', clientesroutes);

//api motos
app.use('/api/motos', motosroutes);

//api ventas
app.use('/api/ventas', ventasroutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});