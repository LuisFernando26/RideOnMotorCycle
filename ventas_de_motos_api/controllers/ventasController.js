//llamamos la bd
const db = require('../db/connection');

//metodo para obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM ventas');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

//metodo para obtener todas las ventas
exports.obtenerVentasporID = async (req, res) => {
    const { id_cliente } = req.body;
    try {
        const [rows] = await db.promise().query('SELECT v.*, c.*, m.nombre, m.modelo, m.marca, m.precio FROM ventas AS v JOIN clientes AS c ON c.id_cliente=v.id_cliente JOIN motos AS m ON m.id_moto=v.id_moto where v.id_cliente=?', [id_cliente]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};


//codigo de prueba para ver todas las compras de los clientes en el front ver hostorial de cliente (empleados)
exports.obtenerVentasConDetalles = async (req, res) => {
    try {
        const [rows] = await db.promise().query(`SELECT v.id_venta, c.nombre AS nombre_cliente, m.nombre, m.marca, m.modelo, m.precio, v.fecha_estimada,  v.estado
      FROM ventas v JOIN clientes c ON c.id_cliente = v.id_cliente JOIN motos m ON m.id_moto = v.id_moto ORDER BY v.fecha_estimada DESC`);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las ventas con detalles' });
    }
};


//Registrar una Venta
exports.registrarVentas = async (req, res) => {
    const { id_cliente, id_moto, fecha_estimada, fecha_entrega } = req.body;
    const estado = "pendiente";
    try {
        //Verificar que los campos estan vacios
        if (!id_cliente || !id_moto || !fecha_estimada || !fecha_entrega) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }


        //Insertar una venta nueva
        const [regventas] = await db.promise().query('INSERT INTO ventas (id_cliente, id_moto, fecha_estimada,fecha_entrega, estado) VALUES (?,?,?,?,?)',
            [id_cliente, id_moto, fecha_estimada, fecha_entrega, estado]);

        res.json({ message: 'Compra registrada con exito', regventas });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al registrar la Venta' });
    }
}

//Actualizar Ventas
exports.actualizarVentas = async (req, res) => {
    const { id_cliente, id_moto, fecha_estimada, fecha_entrega, id_venta } = req.body;

    try {
        //verifica si los campos estan vacios
        if (!id_cliente || !id_moto || !fecha_estimada || !fecha_entrega) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }

        //Actualizando una Venta (consulta)
        const [actVentas] = await db.promise().query('UPDATE ventas SET id_cliente= ?, id_moto= ?, fecha_estimada=?, fecha_entrega=? WHERE id_venta = ?',
            [id_cliente, id_moto, fecha_estimada, fecha_entrega, id_venta]);


        res.json({ message: 'Venta Actualizada exitosamente!', actVentas });

    } catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Error al actualizar la Venta' });
    }

}

//Eliminar Venta
exports.eliminarVentas = async (req, res) => {
    const { id_venta } = req.body;
    try {

        //eliminar una venta
        const [rows] = await db.promise().query('DELETE FROM ventas WHERE id_venta = ?', [id_venta]);

        if (rows.affectedRows === 0) {
            return res.status(401).json({ error: "No existe la venta" })
        }

        res.json({ message: 'Venta Eliminada Exitosamente!', rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al eliminar la Venta' });
    }
}
