const { User } = require('../models/user.model');
const { encryptionKey } = require('../config/env');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwtsimple = require('jwt-simple');
const { body, buildValidation } = require('../helpers/validation-set.helper')
const { throwError } = require('../helpers/errors.helper')

const authentication = async (req, res) => {

    // Getting user from database
    let user = await User.findOne({ login: req.body.login })

    // Validating data
    if (!user) throwError(404, "User not found.")
    if (!await bcrypt.compare(req.body.password, user.password)) {
        throwError(401, "Incorrect data.")
    }
    if (!user.status) throwError(401, "User is disabled.")

    // Create token
    const tokenData = createJWT(user);

    // Response data
    const data = {
        ...tokenData,
        login : user.login,
    }

    return res.status(200).send({ data })
}

const createJWT = (user) => {
    
    // Generatng expiration date 
    const expiration = moment().utc().add({ days: 1 }).unix();

    // Generating token
    const token = jwtsimple.encode({
        user: user._id,
        type: user.type,
        exp: expiration,
    }, encryptionKey);

    // Returning
    return { token: token, token_exp : moment.unix(expiration).utc().format() }
}

module.exports = {
    authentication: [
        buildValidation(authentication, [
            body('login', `Value 'login' is rqeuired.`).exists(),
            body('password', `Value 'password' is required.`).exists()
        ])
    ],
}