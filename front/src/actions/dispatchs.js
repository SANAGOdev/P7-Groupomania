export function setUser(user) {
    return { type: "auth/user/set", payload: user };
}

export function setLogged() {
    return { type: "auth/user/toggled/logged", payload: { logged: true } };
}

export function updatePosts(posts) {
    return { type: "posts/add", payload: posts };
}

export function updateUsers(users) {
    return { type: "auth/users/set", payload: users };
}

export function deleteUser(id) {
    return { type: "post/remove", payload: id };
}