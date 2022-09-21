import { useState } from "react";
import { useSelector } from "react-redux";

import { Row, Card, Form, InputGroup, Button } from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"

import { addPostRequest } from "../../actions/API";

export default function AddPost() {
    const selector = useSelector(state => state.user);

    const [text, setText] = useState("");
    const [image, setImage] = useState({});
    const [imageValue, setImageValue] = useState("");

    function textCheck(e) {
        if (e.target.value.length < 256)
            setText(e.target.value);
    }

    function imageCheck(e) {
        console.log(e.target.files[0]);
        setImage(e.target.files);
        setImageValue(e.target.value);
    }

    function handleClick(event) {
        event.preventDefault(true);

        if (text === "") return;

        const { userId, token } = selector;
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        let payload = new FormData();

        payload.append("userId", userId);
        payload.append("post", JSON.stringify({ text: text }));
        if (image)
            payload.append("image", image[0]);

        addPostRequest(payload, headers);

        setText("");
        setImage({});
        setImageValue("");
    }

    return (
        <Card className="bg-dark mb-3">
            <Card.Header>
                <Row className="align-items-center">
                    <Button className="col-auto border-0" variant="default" disable="true"><FontAwesomeIcon size="2x" icon={faUser} /></Button>
                    <Card.Title className="col-auto">Quoi de Neuf: </Card.Title>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form className="align-items-center">
                    <Form.Group controlId="image-input-form">
                        <Form.Control className="mb-3" as="textarea" name="text" value={text} style={{ resize: "none" }} onChange={textCheck} />
                        <InputGroup >
                            <Form.Control type="file" name="image" files={image} value={imageValue} onChange={imageCheck} />
                            <Button onClick={handleClick}>Envoyer</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}