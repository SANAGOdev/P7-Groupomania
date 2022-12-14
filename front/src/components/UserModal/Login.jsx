import { useState } from "react";
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import passwordValidator from "password-validator";

import { loginReuest } from "../../actions/API"

export default function Login({ errorTrigger }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    var passwordSchema = new passwordValidator();

    passwordSchema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces();                          // Should not have spaces


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [hidden, setHidden] = useState({ email: true, password: true });

    function emailCheck(e) {
        setHidden({ ...hidden, email: emailRegex.test(e.target.value) });
        setEmail(e.target.value);
    }

    function passwordCheck(e) {
        setHidden({ ...hidden, password: passwordSchema.validate(e.target.value) });
        setPassword(e.target.value);
    }

    function handleClick(event) {
        event.preventDefault(true);

        let { email: e, password: p } = hidden;
        const empty = (email === "" || password === "");
        if (!(e && p) || empty) return errorTrigger("Login Error", "Veuillez remplir tous les champs.");

        const payload = { email: email, password: password };
        loginReuest(payload, dispatch, navigate, errorTrigger);
    }

    return (
        <Form>
            <Form.Group className="m-2" controlId="form-login-email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" placeholder="email@email.com" onChange={emailCheck} />
                <Form.Text hidden={hidden.email} className="text-warning">Votre Email n'a pas la bon format</Form.Text>
            </Form.Group>
            <Form.Group className="m-2" controlId="form-login-password">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={passwordCheck} />
                <Form.Text hidden={hidden.password} className="text-warning">Votre mot de passe est trop faible</Form.Text>
            </Form.Group>
            <Button className="m-2 w-100" variant="primary" type="submit" onClick={handleClick}>Connexion</Button>
        </Form>
    );
}