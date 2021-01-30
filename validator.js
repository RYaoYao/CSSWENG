
const { body } = require('express-validator');

const loginValidation = [
    //username should not b empty
    body('email').not().isEmpty().withMessage("Enter a valid email."),
    //Password must not be empty
    body('password').not().isEmpty().withMessage("Enter a valid password")
    ]
    
    module.exports = {  loginValidation};
    