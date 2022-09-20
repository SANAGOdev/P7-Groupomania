import { Card, Row, Button } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faTrashCan, faThumbsUp, faThumbsDown, faCommentDots } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useState } from "react";
import CommentList from "./CommentList";

export default function Post({ id, userId, text, img, likes, dislikes, comments }) {
    const selector = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isDeleting, toggleLoading] = useState(0);
    const [commentVisible, commentToggle] = useState(false);

    function handleClick() {
        toggleLoading(1);
        const { userId, token } = selector;
        const headers = { headers: { Authorization: `Bearer ${token}` }, data: { userId: userId } };

        const url = `http://localhost:5000/api/posts/post/${id}`;
        axios.delete(url, headers)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: "post/remove", payload: id });
            })
            .catch(err => console.log(err));//alert("Failed to delete post")
        //.finally(() => toggleLoading(0));
    }

    function onLike() {
        const { userId, token } = selector;

        if (userId && token && userId !== "" && token !== "") {
            const payload = { userId: userId, reactionValue: !likes.includes(selector.userId) };
            const headers = { headers: { Authorization: `Bearer ${token}` } };

            axios.post(`http://localhost:5000/api/posts/post/${id}/like`, payload, headers)
                .then(res => console.log(res.data))
                .catch(() => alert("Filed to reaction"));
        }
    }

    function onDislike() {
        const { userId, token } = selector;

        if (userId && token && userId !== "" && token !== "") {
            const payload = { userId: userId, reactionValue: -(!dislikes.includes(selector.userId)) };
            const headers = { headers: { Authorization: `Bearer ${token}` } };

            axios.post(`http://localhost:5000/api/posts/post/${id}/like`, payload, headers)
                .then(res => console.log(res.data))
                .catch(() => alert("Failed to reaction"));
        }
    }

    const users = useSelector(state => state.users);
    function decodeId(id) {
        if (!users)
            return "Unknow username";
        let usr;
        users.forEach(element => {
            if (element.userId === id) {
                usr = element.username;
            }
        });
        return usr ? usr : "Unknow username";
    }

    return (
        <Card className="bg-dark" hidden={isDeleting}>
            <Card.Header>
                <Row className="justify-content-bewteen justify-content-center">
                    <Row className="col align-items-center">
                        <Button className="col-auto border-0" variant="default" disable="true"><FontAwesomeIcon size="2x" icon={faUser} /></Button>
                        <Card.Title className="col-auto">{decodeId(userId)}</Card.Title>
                    </Row>
                    {(selector.userId === userId || selector.isAdmin) && <Button className="col-auto rounded-3"><FontAwesomeIcon className="text-light" size="2x" icon={faTrashCan} onClick={handleClick} /></Button>}
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Title>{text}</Card.Title>
                {img && img !== "" && <Card.Img className="ratio ratio-16x9" alt="Post Image" src={img} />}
            </Card.Body>
            <Card.Header>
                <Row>
                    <Button
                        className="col d-flex justify-content-center align-items-center"
                        variant="secondary"
                        disabled={dislikes.includes(selector.userId)}
                        onClick={onLike}
                    >
                        <FontAwesomeIcon className={likes.includes(selector.userId) ? "mx-2 text-success" : "mx-2"} size="2x" icon={faThumbsUp} />
                        {likes.length} Like
                    </Button>
                    <Button
                        className="col d-flex justify-content-center align-items-center"
                        variant="secondary"
                        disabled={likes.includes(selector.userId)}
                        onClick={onDislike}
                    >
                        <FontAwesomeIcon className={dislikes.includes(selector.userId) ? "mx-2 text-danger" : "mx-2"} size="2x" icon={faThumbsDown} />
                        {dislikes.length} DisLike
                    </Button>
                    <Button
                        className="col d-flex justify-content-center align-items-center"
                        variant="secondary"
                        onClick={() => { commentToggle(!commentVisible) }}
                    >
                        <FontAwesomeIcon className="mx-2" size="2x" icon={faCommentDots} />
                        {comments.length} Comments
                    </Button>
                </Row>
            </Card.Header>
            {commentVisible &&
                <Card.Footer>
                    <CommentList id={id} comments={comments} />
                </Card.Footer>
            }
        </Card>
    );
}