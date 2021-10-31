import {Form, Button, Container} from "react-bootstrap";
import React, { useState } from "react";
import { UseLocalStorage} from "./UseLocalStorage";
import { useHistory } from "react-router-dom";

const Lobby = () => {
    const [nickname, setNickname] = UseLocalStorage("nickname", "");
    const [roomName, setRoomName] = useState();
    
    let history = useHistory();

    return(
        <Container>
            <Form className="lobbyForm" onSubmit={event => {
                event.preventDefault();
                history.push("/room/"+roomName);
            }}>
                <Form.Group>
                    <Form.Control value={nickname} placeholder='Name' onChange={event => setNickname(event.target.value)} />
                    <Form.Control placeholder='Room' onChange={event => setRoomName(event.target.value)} />
                </Form.Group>
                <Button type='submit' disabled={!nickname || !roomName}>Join</Button>
            </Form>
        </Container>
    );
}

export default Lobby;
