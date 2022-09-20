const express = require("express"); //import librairie express

const router = express.Router(); //initialisation du router

const userController = require("../controllers/users"); //import du controller user.js

const signupCheck = require("../middlewares/signUpCheck"); // import du middleware signUpCheck.js

const verifyTokenId = require("../middlewares/verifyTokenId");

router.get("/list", userController.list);

router.post("/knowToken", verifyTokenId,userController.knowToken);

router.post("/signup", signupCheck, userController.signup); //définition du path /signup avec ses middlwares et ses controllers

router.post("/login", userController.login); //définition du path /login avec ses middlwares et ses controllers

router.post("/profile", userController.editProfile); //définition du path POST /profile

router.delete("/profile", userController.disableProfile); //définition du path DELETE /profile

module.exports = router; //export le router