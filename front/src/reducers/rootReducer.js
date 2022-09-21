const user = JSON.parse(localStorage.getItem('user'));

const initalState = {
    user: {
        userId: user ? user.userId : "",
        token: user ? user.token : "",
        logged: user ? user.logged : false,
        isAdmin: user ? user.isAdmin : false
    },
    users: {},
    posts: []
}

export default function rootReducer(state = initalState, action) {
    switch (action.type) {

        case "auth/user/set":
            let newState = {
                ...state,
                user: {
                    userId: action.payload.userId,
                    token: action.payload.token,
                    isAdmin: action.payload.isAdmin,
                    logged: true
                }
            };
            localStorage.setItem('user', JSON.stringify(newState.user));
            return newState;

        case "auth/user/clear":
            localStorage.clear();
            return {
                ...state,
                user: {
                    userId: "",
                    token: "",
                    logged: false,
                    isAdmin: false
                }
            };

        case "auth/user/toggled/logged":
            return {
                ...state,
                user: {
                    userId: state.user.userId,
                    token: state.user.token,
                    isAdmin: state.user.isAdmin,
                    logged: action.payload.logged
                }
            };

        case "auth/users/set":
            return {
                ...state,
                users: action.payload
            };

        case "posts/add":
            return {
                ...state,
                posts: action.payload
            };

        case "post/remove":
            return {
                ...state,
                posts: state.posts.filter(e => e._id !== action.payload.id)
            };

        default:
            return state
    }
}