const authenticationController = require('../controllers/authentication.controller')

module.exports = (app) => {
    app.route('/auth')
        .post(authenticationController.authentication)
}