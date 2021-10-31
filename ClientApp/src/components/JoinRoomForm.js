import {Form, Button} from "react-bootstrap";
import { useState } from "react";
import { UseLocalStorage} from "./UseLocalStorage";

const JoinRoomForm = ({ joinRoom }) => {
    const [nickname, setNickname] = UseLocalStorage("nickname", "");
    const [roomName, setRoomName] = useState();
    
    return <Form className="lobbyForm" onSubmit={event => {
        event.preventDefault();
        joinRoom(nickname, roomName);
    }}>
        <Form.Group>
            <Form.Control value={nickname} placeholder='Name' onChange={event => setNickname(event.target.value)} />
            <Form.Control placeholder='Room' onChange={event => setRoomName(event.target.value)} />
        </Form.Group>
        <Button type='submit' disabled={!nickname || !roomName}>Join</Button>
    </Form>
}

export default JoinRoomForm;
