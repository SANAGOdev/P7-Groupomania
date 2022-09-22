import { Button, Container } from "react-bootstrap";

export default function Page404() {
    return (
        <Container className="d-flex justify-content-center">
            <h5>Error 404</h5>
            <Button>Go to Home</Button>
        </Container>
    );
}