//llamamos la librería jsonwebtoken
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    const token = req.headers['authorization'];

    try {
        if (!token) {
            return res.status(403).json({ error: "Necesita un token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
        req.usuario = decoded;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al validar el token' });
    }

};