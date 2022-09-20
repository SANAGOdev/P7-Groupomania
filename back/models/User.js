const mongoose = require("mongoose"); //import de la librairie mongoose

//création du schema utilisateur
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username :{
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  admin: {type: Boolean, default: 0},
  disable: {type: Boolean, default: 0},
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("users", userSchema); //export du model créer sur le schema utilisateur