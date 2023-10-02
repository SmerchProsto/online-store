// get a concrete model from models
const {Brand, Type} = require('../models/models');

const ApiError = require('../error/ApiError');


// we can do it without class, for example function, but class group our data
class BrandController {
    async create(req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}


// we can import this
module.exports = new BrandController();