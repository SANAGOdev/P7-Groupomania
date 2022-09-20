const PasswordValidator = require("password-validator");

const passwordSchema = new PasswordValidator();

const ErrorHandler = require("../MessageHandler");

//export du middlware qui vérifie que l'email et le mot de passe soient bien conformes
module.exports = (req, res, next) => {

    const body = req.body;

    const usernameRegex = /^\S+$/;

    //generate by copilot
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    passwordSchema
        .is().min(8) // Must not have less than 8 characters
        .is().max(100) // Must not have more than 100 characters
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits(2) // Must have at least 2 digits
        .has().not().spaces(); //Must not have spaces

    if (!body.username || !usernameRegex.test(body.username))
        return ErrorHandler.invalidUsername(res);

    if (!body.email || !emailRegex.test(body.email))
        return ErrorHandler.invalidEmail(res);

    if (!body.password || !passwordSchema.validate(body.password))
        return ErrorHandler.invalidPassword(res);

    next(); //passe au prochain middlware
};