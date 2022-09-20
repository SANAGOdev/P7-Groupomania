import axios from "axios";
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux";

export default function AddComment({ id }) {
    const selector = useSelector(state => state.user);

    const [commentText, setCommentText] = useState("")

    function commentCheck(e) {
        if (e.target.value.length < 64)
            setCommentText(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault(true);

        if (commentText === "") return;

        const { userId, token } = selector;
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        const payload = { userId: userId, comment: commentText };

        axios.post(`http://localhost:5000/api/posts/post/${id}/comment`, payload, headers)
            .then(res => console.log(res.data))
            .catch(res => console.log("Error Commenting"));

        setCommentText("");
    }

    return (
        <Form className="row">
            <Form.Group className="col mr-2 mb-2" controlId="">
                <Form.Control name="comment" type="text" placeholder="Commentaire..." value={commentText} onChange={commentCheck} />
            </Form.Group>
            <Button className="col-auto" type="submit" onClick={handleClick} >Envoyer</Button>
        </Form>
    );
}