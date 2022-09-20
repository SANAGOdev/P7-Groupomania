const mongoose = require("mongoose"); //import de la librairie mongoose

//création du schema post
const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true, },
    imageUrl: { type: String },
    usersLiked: [{ type: String, default: [] }],
    usersDisliked: [{ type: String, default: [] }],
    comments : [{type: Object, default: []}],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("posts", postSchema); //export du model créer sur le schema posts