import Login from "./Login"
import SignUp from "./SignUp";
import ErrorAlert from "./ErrorAlert"

import { Row, Button, Modal, Container } from "react-bootstrap"

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserModal(props) {
    const navigate = useNavigate();
    const location = useLocation();


    const selector = useSelector(state => state);
    useEffect(() => {
        const { userId, token } = selector.user;

        if (userId && token && userId !== "" && token !== "")
            navigate("/news");
    }, [navigate, selector.user]);


    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ title: "", message: "" });

    function error(title, message) {
        setAlert({ title: title, message: message });
        setShow(true);
    }

    const c = ["secondary", "primary"];

    useEffect(() => {
        if (props.default)
            navigate("/signin")
    }, [props.default, navigate])

    useEffect(() => {
        setShow(false);
    }, [location]);

    return (
        <Container>
            <Modal show="true" backdrop="static" keyboard={false} centered fullscreen="sm-down">
                <Modal.Header className="p-0 bg-dark">
                    <Row className="g-0 w-100">
                        <Button
                            className="col border-0 rounded-0" size="lg"
                            variant={location.pathname === "/signin" ? c[1] : c[0]} tyep="submit" onClick={() => navigate("/signin")}> {/*() => tab === 1 && setTab(0)*/}
                            Sign In
                        </Button>
                        <Button className="col border-0 rounded-0" size="lg"
                            variant={location.pathname === "/signup" ? c[1] : c[0]} onClick={() => navigate("/signup")}> {/*() => tab === 0 && setTab(1)*/}
                            Sign Up
                        </Button>
                    </Row>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {location.pathname === "/signin" ? <Login errorTrigger={error} /> : <SignUp errorTrigger={error} />}
                    <ErrorAlert show={show} setShow={setShow} title={alert.title} message={alert.message} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}