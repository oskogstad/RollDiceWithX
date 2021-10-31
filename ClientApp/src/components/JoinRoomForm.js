import {Form, Button} from "react-bootstrap";
import { useState } from "react";
import { UseLocalStorage} from "./UseLocalStorage";
import {motion} from "framer-motion";

const JoinRoomForm = ({ joinRoom }) => {
    const [nickname, setNickname] = UseLocalStorage("nickname", "");
    const [roomName, setRoomName] = useState();
    
    return <div>
        <motion.h2 initial={{x: "200"}} animate={{x:0, fontSize: 75, color: "#c3c3c3"}} transition={{duration: 2, type: "spring"}}>Animation!?</motion.h2>
        <Form className="lobbyForm" onSubmit={event => {
            event.preventDefault();
            joinRoom(nickname, roomName);
        }}>
            <Form.Group>
                <Form.Control value={nickname} placeholder='Name' onChange={event => setNickname(event.target.value)} />
                <Form.Control placeholder='Room' onChange={event => setRoomName(event.target.value)} />
            </Form.Group>
            <Button type='submit' disabled={!nickname || !roomName}>Join</Button>
        </Form> 
    </div>
}

export default JoinRoomForm;
