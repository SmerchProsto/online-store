const ApiError = require('../error/ApiError');

//next - it is function, which we pass it on to the next one middleware
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: "Непредвиденная ошибка / Unexpected error"});
}