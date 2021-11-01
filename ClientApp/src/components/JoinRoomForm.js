import {Form, Button, Container} from "react-bootstrap";
import { useState } from "react";
import { UseLocalStorage} from "../utils/UseLocalStorage";
import {motion} from "framer-motion";
import {useHistory} from "react-router-dom";

const JoinRoomForm = ({ addRoom }) => {
    const [nickname, setNickname] = UseLocalStorage("nickname", "");
    const [roomName, setRoomName] = useState();
    const history = useHistory();
    
    const formMotion = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                duration: 1
            }
        }
    }
    
    const controlMotion = {
        hover: {
            scale: 1.04,
            boxShadow: "0px 0px 2px 0px rgb(22 0 0 155)"
        }
    }
    
    const buttonMotion = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1
        },
        hover: {
            scale: 1.1,
            boxShadow: "0px 0px 2px 0px rgb(22 0 0 155)"
        }
    }
    
    return <Container>
        <motion.div variants={formMotion} initial="hidden" animate="show">
            <Form className="lobbyForm" onSubmit={event => {
                event.preventDefault();
                addRoom(roomName);
                history.push("/room/"+roomName);
            }}>
                <Form.Group>
                    <motion.div className="join-form-control" variants={controlMotion} whileHover="hover">
                        <Form.Control value={nickname} placeholder='Name'
                                      onChange={event => setNickname(event.target.value)} />
                    </motion.div>
                    <motion.div className="join-form-control" variants={controlMotion} whileHover="hover">
                        <Form.Control placeholder='Room'
                                      onChange={event => setRoomName(event.target.value)} />
                    </motion.div>
                </Form.Group>
                {nickname && roomName && (
                    <motion.div className="join-form-button"
                                variants={buttonMotion}
                                initial="hidden"
                                animate="show"
                                whileHover="hover">
                        <Button  type='submit'>Join</Button>
                    </motion.div>
                )}

            </Form>
        </motion.div>
    </Container>
}

export default JoinRoomForm;
