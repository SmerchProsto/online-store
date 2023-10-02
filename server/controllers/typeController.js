// get a concrete model from models
const {Type} = require('../models/models');

const ApiError = require('../error/ApiError');

// we can do it without class, for example function, but class group our data
class TypeController {
    async create(req, res) {
        const {name} = req.body;
        const type = await Type.create({name});
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }
}


// we can import this
module.exports = new TypeController();