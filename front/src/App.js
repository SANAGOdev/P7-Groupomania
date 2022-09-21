import "./App.scss";
import Header from "./components/Header";
import UserModal from "./components/UserModal/UserModal";
import PostList from "./components/Posts/PostList";
import Page404 from "./components/Page404"

//import "bootstrap/dist/js/bootstrap" //Import js bootstrap

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./reducers/rootReducer"

function App() {
    const store = configureStore({
        reducer: rootReducer
    });

    return (
        <Provider store={store}>
            <Header />
            <Routes>
                <Route index path="/" element={<UserModal default />} />
                <Route path="/signin" element={<UserModal />} />
                <Route path="/signup" element={<UserModal />} />
                <Route path="/news" element={<PostList />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Provider>
    );
}

export default App;
