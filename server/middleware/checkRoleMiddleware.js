const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            // in headers, we have a token, first arg is typo token and second is a token
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: "Не авторизован / User is not authorized"})
            }
            // verify = check token is a valid
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа / You don't have access"})
            }
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({message: "Не авторизован / User is not authorized"})
        }
    }
}







