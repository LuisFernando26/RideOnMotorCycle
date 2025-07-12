//llamamos la bd
const db = require('../db/connection');

//metodo para obtener todos las Motos
exports.obtenerMotos = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM motos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las Motos' });
    }
};


//Registrar una moto
exports.registrarMotos = async (req, res) => {
    const { nombre, marca, modelo, cilindraje, precio, imagen, id_moto } = req.body;
    const estado = 1;
    try {
        //Verificar que los campos estan vacios
        if (!nombre || !marca || !modelo || !cilindraje || !precio || !imagen) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }

        //Verificar que la moto no este registrado
        const [exiMotos] = await db.promise().query('SELECT * FROM motos WHERE id_moto= ?', [id_moto]);
        if (exiMotos.length > 0) {
            return res.status(401).json({ message: 'Esta moto ya existe!' });
        }

        //Insertar una moto nueva
        const [regMoto] = await db.promise().query('INSERT INTO motos (nombre, marca, modelo, cilindraje, precio, imagen, estado) VALUES (?,?,?,?,?,?,?)',
            [nombre, marca, modelo, cilindraje, precio, imagen, estado]);

        res.json({ message: 'Moto registrada con exito', });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al registrar la moto' });
    }
}

//Actualizar Motos
exports.actualizarMotos = async (req, res) => {
    const { nombre, marca, modelo, cilindraje, precio, imagen, id_moto } = req.body;
    console.log({
        moto: {
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            cilindraje: cilindraje,
            precio: precio,
            imagen: imagen,
            id_moto: id_moto
        }
    })

    try {
        //verifica si los campos estan vacios
        if (!nombre || !marca || !modelo || !cilindraje || precio === null || !imagen) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }

        //Actualizando una Moto (consulta)
        const [actMotos] = await db.promise().query('UPDATE motos SET nombre=?, marca= ?, modelo= ?,cilindraje=?, precio=?, imagen=? WHERE id_moto = ?',
            [nombre, marca, modelo, cilindraje, precio, imagen, id_moto]);


        res.json({ message: 'Moto Actualizada exitosamente!', actMotos });

    } catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Error al actualizar la Moto' });
    }

}

//Eliminar Motos
exports.eliminarMotos = async (req, res) => {
    const { id_moto } = req.body;
    const estado = 0;
    try {

        //eliminar una Moto
        const [rows] = await db.promise().query('UPDATE  motos SET estado=? WHERE id_moto = ?', [estado, id_moto]);

        if (rows.affectedRows === 0) {
            return res.status(401).json({ error: "No existe la Moto" })
        }

        res.json({ message: 'Moto Eliminada Exitosamente!', rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al eliminar la Moto' });
    }
}
