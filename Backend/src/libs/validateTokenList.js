
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    var token = req.cookies['auth-token'];
    if (!token) token = 0;

    if (token != 0) {
        var payload = 0;
        try {
            payload = jwt.verify(token, process.env.SECRETKEY || 'keyNoTanSecreta')
        }
        catch (e) {
            req.userId =null;
        }
        finally {
            req.userId = payload._id;
        }
    } else {
        req.userId=null;
    }

    next();
}