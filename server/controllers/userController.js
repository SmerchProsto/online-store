const ApiError = require('../error/ApiError');

//for hash password and don't store in db
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id: id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

// we can do it without class, for example function, but class group our data
class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password / Uncorrected email or password'));
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует / \n' +
                'A user with this email already exists'));
        }
        // hash a password
        //1st arg - password, 2nd - quantity(количество) hash
        const hashPassword = await bcrypt.hash(password, 5)

        //create a user
        const user = await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id})
        //1st arg - payload, secret key( At that moment it in env)
        // 3 arg - time duration of life circle token
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден / User with this name not found'));
        }
        // if all is ok, then compare user pass and on server
        //sync = synchrony function
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Пользователь не задан / User not found'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }
    async check(req, res, next) {
       /* // params of string request
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'));
        }
        res.json(id)*/

        const token = generateJwt(req.user.id, req.user.email, req.user.email);
        return res.json({token})

    }
}


// we can import this
module.exports = new UserController();