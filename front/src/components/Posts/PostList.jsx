import { Container, Stack } from "react-bootstrap";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post"

import { useNavigate } from "react-router-dom";
import AddPost from "../Posts/AddPost";

//const text1 = "Ducimus vitae quidem ut maiores qui velit nemo aut. Qui nam nobis esse laudantium mollitia voluptas aperiam facere. Magni est sit sint placeat. Et assumenda nesciunt aut. Ipsum cum voluptatem autem iusto.…";
//const text2 = "Enim repudiandae commodi et exercitationem officia qui. Laborum eligendi fugit tempora explicabo debitis blanditiis. Et voluptas ut est similique et. Ullam enim id vel minima repellendus."
//const text3 = "Quibusdam voluptatibus officia aut est repudiandae. Molestias itaque quia voluptatem quaerat et. Ipsa dicta dicta aliquam nulla. Alias sit reiciendis vitae reprehenderit. Est mollitia architecto et non. Quam unde impedit occaecati modi debitis."
//const text4 = "Sapiente cum ratione omnis architecto id ut. Eaque laboriosam animi est libero aut. Modi enim quo officiis nesciunt unde sed modi sint. Perferendis doloremque qui sint."
//const text5 = "Eligendi eligendi est accusantium ea perspiciatis. Aut dignissimos voluptatem dolorem in temporibus est. Molestiae saepe qui quia. Quidem odit eos quis optio."

import { getPostsRequest, getUsersListRequest, knowTokenRequest } from "../../actions/API"

export default function PostList() {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    useEffect(() => {
        const userId = selector.user.userId;
        const token = selector.user.token;

        if (userId && token && userId !== "" && token !== "") {

            const payload = { userId: userId };
            const headers = { headers: { Authorization: `Bearer ${token}` } };

            knowTokenRequest(payload, headers, dispatch);

        } else {
            dispatch({ type: "auth/user/toggled/logged", payload: { logged: false } });
            navigate("/signin");
        }

    }, [selector.user.userId, selector.user.token, navigate, dispatch]);

    useEffect(() => {
        if (!selector.user.logged)
            return;

        getUsersListRequest(dispatch);

        const headers = { headers: { Authorization: `Bearer ${selector.user.token}` } };
        getPostsRequest(headers, dispatch, true);

    }, [selector.user.logged, selector.user.token, dispatch]);


    return (
        <Container className="mt-3 col col-md-10 col-lg-8">
            <AddPost />
            {selector.user.logged ?
                (
                    <Stack gap={3}>
                        {selector.posts ?
                            selector.posts.map(
                                p => //p are post.
                                    <Post
                                        key={p._id}
                                        id={p._id}
                                        userId={p.userId}
                                        username={p.userId}
                                        text={p.text}
                                        img={p.imageUrl}
                                        likes={p.usersLiked}
                                        dislikes={p.usersDisliked}
                                        comments={p.comments}
                                    />)
                            : "NaN" //Create No Post page
                        }
                    </Stack>
                ) : null}
        </Container>
    );
}