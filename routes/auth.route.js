const authcontroller = require('../controllers/auth.controller');
const authMW = require('../middleware/auth.mw');

module.exports = (app) => {
    // Route for user signup
    app.post("/ecomm/api/vi/auth/signup", [authMW.verifySignUpBody], authcontroller.signup);

    // Route for user signin
};
