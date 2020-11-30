
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.cookies['auth-token'];
    if (!token) return res.status(401).json({ status: {notAuthorized: "No estas logeado o no tienes permiso para entrar en esta pagina", msg:'Acceso Denegado'} });
    
    var payload=0;
    try {
        payload = jwt.verify(token, process.env.SECRETKEY || 'keyNoTanSecreta')
    }

    catch (e) {
        res.status(500).json({ status: 'El token es invalido' })
    }
    finally {
        req.userId = payload._id;
    }


    next();
}