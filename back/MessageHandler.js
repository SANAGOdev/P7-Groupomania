exports.sucess =            (res) => res.status(200).json({ message: "Sucess" });

exports.unhandledError =    (res) => res.status(500).json({ message: "Unhandled Error, contact an administrator" });

exports.alreadyExist =      (res) => res.status(401).json({ message: "Email or Username are already used." });

exports.invalidUsername =   (res) => res.status(400).json({ message: "Username is invalid" });
exports.invalidEmail =      (res) => res.status(400).json({ message: "Email is invalid" });
exports.invalidPassword =   (res) => res.status(400).json({ message: "Password is invalid" });

exports.noToken =           (res) => res.status(403).json({ message: "Authorization Not Specified" });
exports.noUserId =          (res) => res.status(403).json({ message: "UserId Not Specified" });
exports.tokenId =           (res) => res.status(403).json({ message: "Specified token is not in agreement with the userId." });

exports.noPost =            (res) => res.status(401).json({ message: "Post does not exist." });
exports.notOwner =          (res) => res.status(403).json({ message: "You are not the owner of this post." });

exports.noUser =            (res) => res.status(401).json({ message: "User does not exist." });
exports.wrongPassword =     (res) => res.status(401).json({ message: "Wrong Password" });
exports.disabledUser =      (res) => res.status(401).json({ message: "User is disable, contact an administrator." });

exports.reactionError =     (res) => res.status(401).json({message: "You have already react on this post."});

exports.bcryptError =       (res) => res.status(500).json({ message: "Error when hashing password, contact an administrator." });

exports.genericError =      (res, code, err) => res.status(code).json(err);
