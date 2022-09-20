import axios from "axios";

export function getPostsRequest(headers, dispatch, first) {
    axios.post("http://localhost:5000/api/posts", { first: first }, headers)
        .then((res) => {
            dispatch({ type: "posts/add", payload: res.data.reverse() })
        }).catch(err => alert("Retreiving posts failed", err))
        .finally(() => getPostsRequest(headers, dispatch, false));
}

export function signUpRequest(payload, navigate, errorTrigger){
    axios.post("http://localhost:5000/api/auth/signup", payload)
    .then((res) => {
        navigate("/signin");
    }).catch(err => errorTrigger("Login Error", err.response.data.message));
}

export function loginReuest(payload, dispatch, navigate, errorTrigger) {
    axios.post("http://localhost:5000/api/auth/login", payload)
        .then((res) => {
            dispatch({ type: "auth/user/set", payload: res.data });
            navigate("/news");
        }).catch(err => errorTrigger("Login Error", err.response.data.message));
}