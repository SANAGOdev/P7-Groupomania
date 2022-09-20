import React from "react";
import { Image, Button } from "react-bootstrap"

import Logo from "../assets/icon-left-font-transparent-resize.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
    const selector = useSelector(state => state.user);
    const dispatch = useDispatch();

    function handleClick(){
        dispatch({type:"auth/user/clear"});
    }

    return (
        <div className="vh-15 header d-flex justify-content-between align-items-center">
                <Image className="h-100 col-auto" src={Logo} alt="Logo" fluid />
                {selector.token !== ""&&<Button className="col-auto h-50 border m-2" variant="default" onClick={handleClick}><FontAwesomeIcon size="2x" icon={faArrowRightFromBracket} /></Button>}
        </div>

    );
}