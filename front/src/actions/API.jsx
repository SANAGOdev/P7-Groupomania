import axios from "axios";

import { setUser, setLogged, updatePosts, updateUsers, deleteUser } from "./dispatchs";

export function signUpRequest(payload, navigate, errorTrigger) {
    axios.post(`${process.env.REACT_APP_API_URL}api/auth/signup`, payload)
        .then((res) => {
            navigate(`/signin`);
        }).catch(err => errorTrigger(`Signup Error`, err.response.data.message));
}


export function loginReuest(payload, dispatch, navigate, errorTrigger) {
    axios.post(`${process.env.REACT_APP_API_URL}api/auth/login`, payload)
        .then((res) => {
            dispatch(setUser(res.data));
            navigate(`/news`);
        }).catch(err => errorTrigger(`Login Error`, err.response.data.message));
}

export function knowTokenRequest(payload, headers, dispatch) {
    axios.post(`${process.env.REACT_APP_API_URL}api/auth/knowToken`, payload, headers)
        .then(() => {
            dispatch(setLogged());
        })
        .catch(() => console.log(`error fetch token`));
}

export function getPostsRequest(headers, dispatch, first) {
    axios.post(`${process.env.REACT_APP_API_URL}api/posts`, { first: first }, headers)
        .then((res) => {
            dispatch(updatePosts(res.data.reverse()));
        }).catch(err => alert(`Retreiving posts failed`, err))
        .finally(() => getPostsRequest(headers, dispatch, false));
}

export function getUsersListRequest(dispatch) {
    axios.get(`${process.env.REACT_APP_API_URL}api/auth/list`)
        .then(res => {
            dispatch(updateUsers(res.data));
        }).catch(() => console.log(`error fetch users`));
}

export function addPostRequest(payload, headers) {
    axios.post(`${process.env.REACT_APP_API_URL}api/posts/post`, payload, headers)
        .then((res) => { })
        .catch(() => alert(`Failed to add post`));
}

export function deletePostRequest(id, headers, dispatch) {
    axios.delete(`${process.env.REACT_APP_API_URL}api/posts/post/${id}`, headers)
        .then((res) => {
            dispatch(deleteUser(id));
        })
        .catch(err => console.log(err));
}

export function likeReactionPostRequest(id, payload, headers) {
    axios.post(`${process.env.REACT_APP_API_URL}api/posts/post/${id}/like`, payload, headers)
        .then(res => { })
        .catch(() => alert(`Filed to reaction`));
}

export function dislikeReactionPostRequest(id, payload, headers) {
    axios.post(`${process.env.REACT_APP_API_URL}api/posts/post/${id}/like`, payload, headers)
        .then(res => { })
        .catch(() => alert(`Failed to reaction`));
}

export function commentReactionPostRequest(id, payload, headers) {
    axios.post(`${process.env.REACT_APP_API_URL}api/posts/post/${id}/comment`, payload, headers)
        .then(res => { })
        .catch(res => console.log(`Error Commenting`));
}