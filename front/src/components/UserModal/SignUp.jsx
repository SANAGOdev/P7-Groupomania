import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import passwordValidator from "password-validator";

import { signUpRequest } from "../../actions/API"

export default function SignUp({ errorTrigger }) {
    const navigate = useNavigate();

    const usernameRegex = /^\S+$/;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    var passwordSchema = new passwordValidator();

    passwordSchema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces();                          // Should not have spaces

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [hidden, setHidden] = useState({ username: true, email: true, password: true, confirmPassword: true });

    function usernameCheck(e) {

        setHidden({ ...hidden, username: usernameRegex.test(e.target.value) });
        setUsername(e.target.value);
    }

    function emailCheck(e) {
        setHidden({ ...hidden, email: emailRegex.test(e.target.value) });
        setEmail(e.target.value);
    }

    function passwordCheck(e) {
        setHidden({ ...hidden, password: passwordSchema.validate(e.target.value) });
        setPassword(e.target.value);
    }

    function confirmPasswordCheck(e) {
        setHidden({ ...hidden, confirmPassword: password === e.target.value });
        setConfirmPassword(e.target.value);
    }

    function handleClick(event) {
        event.preventDefault(true);

        let { username: u, email: e, password: p, confirmPassword: cp } = hidden;
        const empty = (username === "" || email === "" || password === "" || confirmPassword === "");
        if (!(u && e && p && cp) || empty) return errorTrigger("SignUp Error", "Veuillez remplir tous les champs.");

        const payload = { username: username, email: email, password: password };
        signUpRequest(payload, navigate, errorTrigger);
    }

    return (
        <Form>
            <Form.Group className="m-2" controlId="from-signup-username">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={usernameCheck} />
                <Form.Text hidden={hidden.username} className="text-warning">Votre Username n'a pas la bon format</Form.Text>
            </Form.Group>
            <Form.Group className="m-2" controlId="from-signup-email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" placeholder="email@email.com" onChange={emailCheck} />
                <Form.Text hidden={hidden.email} className="text-warning">Votre Email n'a pas la bon format</Form.Text>
            </Form.Group>
            <Form.Group className="m-2" controlId="from-signup-password">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={passwordCheck} />
                <Form.Text hidden={hidden.password} className="text-warning">Votre mot de passe est trop faible</Form.Text>
            </Form.Group>
            <Form.Group className="m-2" controlId="from-signup-confirm-password">
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={confirmPasswordCheck} />
                <Form.Text hidden={hidden.confirmPassword} className="text-warning">Le mot de passe n'est pas identique</Form.Text>
            </Form.Group>
            <Button className="m-2 w-100" variant="primary" type="submit" onClick={handleClick} >Crée un Compte</Button>
        </Form>
    );
}