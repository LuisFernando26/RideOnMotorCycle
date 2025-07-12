//llamamos la bd
const db = require('../db/connection');
//llamamos la librería jsonwebtoken
const jwt = require('jsonwebtoken');
//llamamos la librería bcrypt
const bcrypt = require('bcrypt');


//metodo para obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM clientes');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};


//metodo para validar correo - obtener un empleado:
exports.validarClientesPorCorreo = async (req, res) => {
    // params --> GET
    // body --> POST
    const { correo, contraseña } = req.body;
    try {
        //validamos que el correo y la contraseña no estén vacíos
        if (!correo || !contraseña) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacíos!' });
        }

        const [rows] = await db.promise().query('SELECT * FROM clientes WHERE correo = ?', [correo]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Este correo no existe' });
        }

        const clientes = rows[0];

        //se valida la contraseña que viajó en los parametros con la registrada en la bd.
        const match = await bcrypt.compare(contraseña, clientes.contraseña);

        //si match es false se envía un mensaje de contraseña incorrecta
        if (!match) {
            return res.status(401).json({ message: "contraseña incorrecta" });
        }

        //creamos el token y pasamos valores básicos del usuario (no enviar la contraseña por seguridad)
        //le decimos el valor que tendrá nuestro token (antes declarado en las variables .env, o le pasamos una
        //por defecto)
        //le damos un tiempo de expiración.
        const token = jwt.sign({
            id: clientes.id,
            correo: clientes.correo,
            nombre: clientes.nombre
        }, process.env.JWT_SECRET || 'secreto123', { expiresIn: '2h' });

        //enviamos el token en la respuesta para usarlo en el front-end.
        res.json({
            message: "Bienvenido",
            cliente: { id: clientes.id_cliente, nombre: clientes.nombre, correo }, token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el empleado' });
    }
};


//Registrar un cliente
exports.registrarClientes = async (req, res) => {
    const { nombre, telefono, correo, contraseña } = req.body;
    try {
        //Verificar que los campos estan vacios
        if (!nombre || !telefono || !correo || !contraseña) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }

        //Verificar que el correo no este registrado
        const [exisID] = await db.promise().query('SELECT * FROM clientes WHERE correo = ?', [correo]);
        if (exisID.length > 0) {
            return res.status(401).json({ message: 'Este cliente ya existe!' });
        }

        //hasheando la contraseña
        //protegiendo la contraseña
        const hashedcontraseña = await bcrypt.hash(contraseña, 10);


        //Insertar un cliente nuevo
        const [regCliente] = await db.promise().query('INSERT INTO clientes (nombre, telefono, correo, contraseña) VALUES (?,?,?,?)',
            [nombre, telefono, correo, hashedcontraseña]);


        const token = jwt.sign({
            id: regCliente.insertId,
            correo: correo,
            nombre: nombre
        }, process.env.JWT_SECRET || 'secreto123', { expiresIn: '2h' });

        res.json({
            message: 'cliente creado con exito',
            clientes: { id: regCliente.insertId, correo },
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al registrar el cliente' });
    }
}


//Actualizar clientes
exports.actualizarClientes = async (req, res) => {
    const { nombre, telefono, correo, contraseña, id_cliente } = req.body;

    try {
        //verifica si los campos estan vacios
        if (!nombre || !telefono || !correo || !contraseña) {
            return res.status(401).json({ message: 'Los campos no pueden estar vacios!' });
        }



        //hasheando la contraseña
        //protegiendo la contraseña
        const hashedcontraseña = await bcrypt.hash(contraseña, 10);


        //Actualizando un Cliente (consulta)
        const [actClientes] = await db.promise().query('UPDATE clientes SET nombre= ?, telefono= ?, correo=?, contraseña=? WHERE id_cliente = ?',
            [nombre, telefono, correo, hashedcontraseña, id_cliente]);


        res.json({ message: 'Cliente Actualizado exitosamente!', actClientes });

    } catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Error al actualizar el Cliente' });
    }

}


//Eliminar Clientes
exports.eliminarClientes = async (req, res) => {
    const { id_cliente } = req.body;
    try {

        //eliminar un cliente
        const [rows] = await db.promise().query('DELETE FROM clientes WHERE id_cliente = ?', [id_cliente]);

        if (rows.affectedRows === 0) {
            return res.status(401).json({ error: "No existe el Cliente" })
        }

        res.json({ message: 'Cliente Eliminado Exitosamente!', rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
}
