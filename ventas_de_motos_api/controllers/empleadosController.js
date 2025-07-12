//llamamos la bd
const db = require('../db/connection');
//llamamos la librería jsonwebtoken
const jwt = require('jsonwebtoken');
//llamamos la librería bcrypt
const bcrypt = require('bcrypt');

//metodo para obtener todos los empleados
exports.obtenerEmpleados = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM empleados');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
};


//metodo para validar correo - obtener un empleado:
exports.validarEmpleadosPorCorreo = async (req, res) => {
    
    // params --> GET
    // body --> POST
    const { correo, contraseña } = req.body;
    try {
        //validamos que el correo y la contraseña no estén vacíos
        if (!correo || !contraseña) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacíos!' });
        }

        const [rows] = await db.promise().query('SELECT * FROM empleados WHERE correo = ?', [correo]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Este correo no existe' });
        }

        const empleados = rows[0];

        //se valida la contraseña que viajó en los parametros con la registrada en la bd.
        const match = await bcrypt.compare(contraseña, empleados.contraseña);

        //si match es false se envía un mensaje de contraseña incorrecta
        if (!match) {
            return res.status(401).json({ message: "contraseña incorrecta" });
        }

        //creamos el token y pasamos valores básicos del usuario (no enviar la contraseña por seguridad)
        //le decimos el valor que tendrá nuestro token (antes declarado en las variables .env, o le pasamos una
        //por defecto)
        //le damos un tiempo de expiración.
        const token = jwt.sign({
            id: empleados.id,
            correo: empleados.correo,
            nombre: empleados.nombre
        }, process.env.JWT_SECRET || 'secreto123', { expiresIn: '2h' });

        //enviamos el token en la respuesta para usarlo en el front-end.
        res.json({
            message: "Bienvenido",
            empleados: { id: empleados.id_empleado, nombre: empleados.nombre, correo }, token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el empleado' });
    }
};


//Registrar un Empleado
exports.registrarEmpleados = async (req, res) => {
    const { nombre, cargo, telefono, correo, contraseña } = req.body;
    try {
        //Verificar que los campos estan vacios
        if (!nombre || !cargo || !telefono || !correo || !contraseña) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }

        //Verificar que el correo no este registrado
        const [existCorreo] = await db.promise().query('SELECT * FROM empleados WHERE correo = ?', [correo]);
        if (existCorreo.length > 0) {
            return res.status(401).json({ message: 'Este correo ya existe!' });
        }

        //hasheando la contraseña
        //protegiendo la contraseña
        const hashedcontraseña = await bcrypt.hash(contraseña, 10);

        //Insertar un empleado nuevo
        const [regempleados] = await db.promise().query('INSERT INTO empleados (nombre, cargo, telefono, correo, contraseña) VALUES (?,?,?,?,?)',
            [nombre, cargo, telefono, correo, hashedcontraseña]);

        const token = jwt.sign({
            id: regempleados.insertId,
            correo: correo,
            nombre: nombre
        }, process.env.JWT_SECRET || 'secreto123', { expiresIn: '2h' });

        res.json({
            message: 'Empleado creado con exito',
            empleados: { nombre, id: regempleados.insertId, correo },
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
}

//Actualizar Empleados
exports.actualizarEmpleados = async (req, res) => {
    const { nombre, cargo, telefono, correo, contraseña, id_empleado } = req.body;

    try {
        //verifica si los campos estan vacios
        if (!nombre || !cargo || !telefono || !correo || !contraseña) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }


        //hasheando la contraseña
        //protegiendo la contraseña
        const hashedcontraseña = await bcrypt.hash(contraseña, 10);

        //Actualizando un Empleado
        const [actEmpleados] = await db.promise().query('UPDATE empleados SET nombre= ?, cargo= ?, telefono= ?, correo= ? , contraseña=? WHERE id_empleado = ?',
            [nombre, cargo, telefono, correo, hashedcontraseña, id_empleado]);


        res.json({ message: 'Empleado Actualizado exitosamente!', actEmpleados });

    } catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }

}

//Eliminar Empleado
exports.eliminarEmpleados = async (req, res) => {
    const { id_empleado } = req.body;
    try {

        //eliminar el empleado
        const [rows] = await db.promise().query('DELETE FROM empleados WHERE id_empleado = ?', [id_empleado]);

        if (rows.affectedRows === 0) {
            return res.status(401).json({ error: "No existe el empleado" })
        }

        res.json({ message: 'Empleado Eliminado Exitosamente!', rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener el empleado' });
    }
}
