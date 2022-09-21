import { Card, Button } from "react-bootstrap"
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Comment({ userId, text }) {
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
        <Card className="bg-dark">
            <Card.Body className="pt-0">
                <Card.Title className="row align-items-center border-bottom">
                    <Button className="col-auto border-0" variant="default" disable="true"><FontAwesomeIcon icon={faUser} /></Button>
                    <Card.Title className="col-auto p-0 m-0">{decodeId(userId)}: </Card.Title>
                </Card.Title>
                {text}
            </Card.Body>
        </Card>
    );
}