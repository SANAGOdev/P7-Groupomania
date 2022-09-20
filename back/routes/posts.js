const express = require("express"); //import librairie express

const router = express.Router(); //initialisation du router

const postsController = require("../controllers/posts"); //import du controller user.js

const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/verifyToken");
const verifyTokenId = require("../middlewares/verifyTokenId");

const multerConfig = require("../middlewares/multerConfig");

router.post("/", verifyToken, postsController.list); //Get All Post

router.get("/post/:id", verifyToken, postsController.getPost); //Get One Post

router.post("/post", multerConfig, verifyTokenId, postsController.addPost); //Add Post

router.delete("/post/:id", verifyTokenId, isAdmin, postsController.deletePost); //Delete Post

router.post("/post/:id/like", verifyTokenId, postsController.like); //Reaction To Post

router.post("/post/:id/comment", verifyTokenId, postsController.addComent);

module.exports = router; //export le router