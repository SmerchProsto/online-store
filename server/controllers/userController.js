const ApiError = require('../error/ApiError');
// we can do it without class, for example function, but class group our data
class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }
    async check(req, res, next) {
        // params of string request
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'));
        }
        res.json(id)
    }
}


// we can import this
module.exports = new UserController();