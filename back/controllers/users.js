const bcrypt = require("bcrypt"); //import de la librairie bcrypt
var jwt = require("jsonwebtoken"); //import de la librairie jwt
require("dotenv").config(); //import de la dotenv
const SECRET_TOKEN = process.env.SECRET_TOKEN; //import de la clée privée

const User = require("../models/User"); //import du model User

const ErrorHandler = require("../MessageHandler");

exports.list = (req, res, next) => {
	let usr;
	User.find({})
		.then((users) => { usr = users })
		.catch(() => { ErrorHandler.unhandledError(res) })
		.finally(() => {
			usr = usr.map(e => { return { userId: e._id, username: e.username } });
			res.status(200).json(usr);
		});
}


exports.knowToken = (req, res, next) => {
	ErrorHandler.sucess(res);
}

exports.signup = (req, res, next) => {
	const body = req.body;

	bcrypt
		.hash(body.password, 12) //12 tours de chiffrage
		.then((hash) => {
			const user = new User({
				email: body.email,
				username: body.username,
				password: hash,
			}); //récupération de l'email/mot de passe utilisateur

			user.save() //sauvegarde de l'utilsateur dans la base de donnée
				.then(() => ErrorHandler.sucess(res))
				.catch(() => ErrorHandler.unhandledError(res)); //renvoie une erreur dans le cas échéant
		})
		.catch(() => ErrorHandler.bcryptError(res)); //renvoie une erreur dans le cas échéant
};

exports.login = (req, res, next) => {
	const body = req.body;

	User.findOne({ email: body.email }) //récupération de l'email utilisateur
		.then((user) => {
			if (!user) return ErrorHandler.noUser(res);
			if (user.disable) return ErrorHandler.disabledUser(res);

			bcrypt
				.compare(body.password, user.password)
				.then((result) => {
					if (!result) return ErrorHandler.wrongPassword(res);

					//création du payload renvoyé au client
					const payload = {
						userId: user._id.toString(),
						token: jwt.sign(
							{ userId: user._id.toString() },
							`${SECRET_TOKEN}`,
							{ expiresIn: "6h" }
						),
						isAdmin: user.admin
					};

					res.status(200).json(payload);
				})
				.catch(() => ErrorHandler.bcryptError(res)); //renvoie une erreur dans le cas échéant
		})
		.catch(() => ErrorHandler.unhandledError(res)); //renvoie une erreur dans le cas échéant
};

exports.editProfile = (req, res, next) => {
	const body = req.body;

	User.findOne({ email: body.email })
		.then((user) => {
			if (!user) return ErrorHandler.noUser(res);
			if (user.disable) return ErrorHandler.disabledUser(res);

			bcrypt
				.compare(body.password, user.password)
				.then(async (result) => {
					if (!result) return ErrorHandler.wrongPassword(res);

					if (body.newUsername)
						user.username = body.newUsername;

					if (body.newPassword)
						await bcrypt
							.hash(body.newPassword, 12) //12 tours de chiffrage
							.then((hash) => user.password = hash)
							.catch(() => ErrorHandler.bcryptError(res)); //renvoie une erreur dans le cas échéant

					user.save() //sauvegarde de l'utilsateur dans la base de donnée
						.then(() => ErrorHandler.sucess(res))
						.catch(() => ErrorHandler.unhandledError(res)); //renvoie une erreur dans le cas échéant
				})
				.catch(() => ErrorHandler.bcryptError(res)); //renvoie une erreur dans le cas échéant
		})
		.catch(() => ErrorHandler.unhandledError(res)); //renvoie une erreur dans le cas échéant
};

exports.disableProfile = (req, res, next) => {
	const body = req.body;

	User.findOne({ email: body.email })
		.then((user) => {
			if (!user) return ErrorHandler.noUser(res);
			if (user.disable) return ErrorHandler.disabledUser(res);

			bcrypt
				.compare(body.password, user.password)
				.then((result) => {
					if (!result) return ErrorHandler.wrongPassword(res);

					user.disable = 1;

					user.save() //sauvegarde de l'utilsateur dans la base de donnée
						.then(() => ErrorHandler.sucess(res))
						.catch(() => ErrorHandler.unhandledError(res)); //renvoie une erreur dans le cas échéant
				})
				.catch(() => ErrorHandler.bcryptError(res)); //renvoie une erreur dans le cas échéant
		})
		.catch(() => ErrorHandler.unhandledError(res)); //renvoie une erreur dans le cas échéant
};
