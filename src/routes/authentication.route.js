const authenticationController = require('../controllers/authentication.controller')

module.exports = (app) => {
    app.route('/auth/sign-in')
        .post(authenticationController.signIn)

    app.route('/auth/sign-up')
        .post(authenticationController.signUp)
}