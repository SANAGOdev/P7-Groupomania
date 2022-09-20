const jwt = require("jsonwebtoken"); //import de la librarie jwt

const ErrorHandler = require("../MessageHandler");

const SECRET_TOKEN = process.env.SECRET_TOKEN; //import de la clée privée

//export d"une middlware
module.exports = (req, res, next) => {
    //vérifie qu"un token est spécifié et renvoie une erreur dans le cas échéant
    if (!req.headers.authorization) return ErrorHandler.noToken(res);

    if (!req.body.userId) return ErrorHandler.noUserId(res);

    const token = req.headers.authorization.split(" ")[1]; //récupération du token

    const userId = req.body.userId;

    //vérifie que le token corresponde à l"id et ne soit pas expiré
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        if (decoded.userId != userId) return ErrorHandler.tokenId(res);

        next();
    } catch (err) {
        console.log("err");
        return ErrorHandler.genericError(res, 403, err);
    }
};