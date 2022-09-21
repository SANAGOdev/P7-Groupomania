import { Alert } from "react-bootstrap";

export default function ErrorAlert({ show, setShow, title, message }) {
    return (
        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{title}</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
}