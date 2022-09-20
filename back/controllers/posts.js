var fs = require("fs"); //import de la librairie fs

const config = require("../config"); //import de la configuration
const port = config.port; //récupération du port depuis la config

const Post = require("../models/Post"); //import de la librairie bcrypt

const ErrorHandler = require("../MessageHandler");
const User = require("../models/User");

const redux = require("redux");

function reducer(state = false, action) {
    switch (action.type) {
        case "set":
            return action.payload;
        default:
            return state;
    }
}

const store = redux.createStore(reducer);

let machin = true;
setInterval(() => {
    if(machin === true)
        store.dispatch({ type: "set", payload: true })
}, 500);

exports.list = (req, res, next) => {
    if (req.body.first)
        return Post.find({})
            .then((posts) => {
                res.status(200).json(posts);
            })
            .catch(err => ErrorHandler.unhandledError(res));
    
    const disable = store.subscribe(() => {
        if (store.getState() === true) {
            Post.find({})
                .then((posts) => {
                    res.status(200).json(posts);
                })
                .catch(err => ErrorHandler.unhandledError(res)) //Sometime error
                .finally(() => { store.dispatch({ type: "set", payload: false }); machin = false; disable(); });
        }
    });
}

exports.getPost = (req, res, next) => {
    const id = req.params.id;

    //récupération du post
    Post.findOne({ _id: id })
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).json(err));
}

exports.addPost = (req, res, next) => {
    let imageUrl = "";
    if (req.file)
        imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const body = req.body;
    const postBody = JSON.parse(body.post);

    //création du post
    const post = new Post({
        userId: body.userId,
        text: postBody.text,
        imageUrl: imageUrl
    });

    //sauvegarde du post
    post
        .save()
        .then(() => ErrorHandler.sucess(res))
        .catch((err) => res.status(500).json(err)) //renvoie une erreur dans le cas échéant
        .finally(() => machin = true);
}

exports.deletePost = (req, res, next) => {
    const id = req.params.id;

    const body = req.body;

    const userId = body.userId;

    Post.findOne({ _id: id })
        .then((post) => {
            if (!post) return ErrorHandler.noPost(res);
            if (post.userId != userId && !res.locals.isAdmin) return ErrorHandler.notOwner(res);

            const imageUrl = post.imageUrl.replace(`${req.protocol}://${req.get("host")}/`, "");

            if (imageUrl != "")
                fs.unlinkSync(imageUrl);

            post.remove()
                .then(() => ErrorHandler.sucess(res))
                .catch(() => ErrorHandler.unhandledError(res));
        })
        .catch(() => ErrorHandler.unhandledError(res))
        .finally(() => machin = true);
}

exports.like = (req, res, next) => {
    const id = req.params.id;

    const body = req.body;

    const userId = body.userId;

    const value = body.reactionValue;

    Post.findOne({ _id: id })
        .then((post) => {
            if (!post) return ErrorHandler.noPost(res);
            if (value == -1 || value == 1) {
                if (post.usersLiked.includes(userId) || post.usersDisliked.includes(userId)) return ErrorHandler.reactionError(res);

                if (value == 1) //add to likes
                    Post.findByIdAndUpdate(id, { $push: { "usersLiked": userId } })
                        .then(() => ErrorHandler.sucess(res))
                        .catch(err => {
                            console.warn(err);
                            ErrorHandler.unhandledError(res);
                        });

                if (value == -1) //add to dislikes
                    Post.findByIdAndUpdate(id, { $push: { "usersDisliked": userId } })
                        .then(() => ErrorHandler.sucess(res))
                        .catch(err => {
                            console.warn(err);
                            ErrorHandler.unhandledError(res);
                        });
            } else {
                if (post.usersLiked.includes(userId))//remove from likes
                    Post.findByIdAndUpdate(id, { $pull: { "usersLiked": userId } })
                        .then(() => ErrorHandler.sucess(res))
                        .catch(err => {
                            console.warn(err);
                            ErrorHandler.unhandledError(res);
                        });

                if (post.usersDisliked.includes(userId)) //remove from dislikes
                    Post.findByIdAndUpdate(id, { $pull: { "usersDisliked": userId } })
                        .then(() => ErrorHandler.sucess(res))
                        .catch(err => {
                            console.warn(err);
                            ErrorHandler.unhandledError(res);
                        });
            }

        })
        .catch(err => {
            console.warn(err);
            ErrorHandler.unhandledError(res);
        })
        .finally(() => machin = true);
}

exports.addComent = (req, res, next) => {
    const id = req.params.id;

    const body = req.body;

    const userId = body.userId;
    const comment = body.comment;

    Post.findByIdAndUpdate({ _id: id }, { $push: { comments: { userId, comment } } })
        .then(() => ErrorHandler.sucess(res))
        .catch(() => ErrorHandler.unhandledError(res))
        .finally(() => machin = true);
}