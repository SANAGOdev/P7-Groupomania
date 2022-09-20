import "./App.scss";
import Header from "./components/Header";
import UserModal from "./components/UserModal";
import PostList from "./components/PostList";
//import "bootstrap/dist/js/bootstrap" //Import js bootstrap

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux"
import { createStore } from "redux"

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

    const initalState = {
        user: {
            userId: user ? user.userId : "",
            token: user ? user.token : "",
            isAdmin: user ? user.isAdmin : false
        },
        users: {},
        posts: []
    }

    function rootReducer(state = initalState, action) {
        switch (action.type) {
            case "auth/user/set":
                let newState = {
                    ...state,
                    user: {
                        userId: action.payload.userId,
                        token: action.payload.token,
                        isAdmin: action.payload.isAdmin
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
                        toekn: "",
                        isAdmin: false
                    }
                }
            case "auth/users/set":
                return {
                    ...state,
                    users: action.payload
                }
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

    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <Header />
            <Routes>
                <Route index path="/" element={<UserModal default />} />
                <Route path="/signin" element={<UserModal />} />
                <Route path="/signup" element={<UserModal />} />
                <Route path="/news" element={<PostList />} />
            </Routes>
        </Provider>
    );
}

export default App;
