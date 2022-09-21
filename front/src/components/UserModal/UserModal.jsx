import Login from "./Login"
import SignUp from "./SignUp";
import ErrorAlert from "./ErrorAlert"

import { Row, Button, Modal, Container } from "react-bootstrap"

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserModal(props) {
    const navigate = useNavigate(); //Change window location
    const location = useLocation(); //Get window location

    const selector = useSelector(state => state); //Connect to redux store

    const [show, setShow] = useState(false); //Show the alert
    const [alert, setAlert] = useState({ title: "", message: "" }); //Alert content


    useEffect(() => {
        if (props.default)
            navigate("/signin") //Set default modal tab to SignIn
    }, [props.default, navigate])

    useEffect(() => { //Handle window location change
        setShow(false); //Reset Alert
    }, [location]);

    useEffect(() => {
        if (selector.user.logged) //Check if user is logged
            navigate("/news"); //Go to news page
    }, [navigate, selector.user]);


    function error(title, message) { //Trigger Alert
        setAlert({ title: title, message: message });
        setShow(true);
    }


    const c = ["primary", "secondary"]; //Colors

    return (
        <Container>
            <Modal show="true" backdrop="static" keyboard={false} centered fullscreen="sm-down">
                <Modal.Header className="p-0 bg-dark">
                    <Row className="g-0 w-100">
                        <Button
                            className="col border-0 rounded-0" size="lg"
                            variant={location.pathname === "/signin" ? c[0] : c[1]} tyep="submit" onClick={() => navigate("/signin")}> {/*() => tab === 1 && setTab(0)*/}
                            Sign In
                        </Button>
                        <Button className="col border-0 rounded-0" size="lg"
                            variant={location.pathname === "/signup" ? c[0] : c[1]} onClick={() => navigate("/signup")}> {/*() => tab === 0 && setTab(1)*/}
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