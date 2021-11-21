import {Container, Button, Alert} from "react-bootstrap";
import Rolls from "./Rolls";
import RollInput from "./RollInput";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {useEffect, useState} from "react";
import Connecting from "./Connecting";
import {UseLocalStorage} from "../utils/UseLocalStorage";
import {getRandomName} from "../utils/RandomName";
import {useParams, useHistory} from "react-router-dom";
import {motion} from "framer-motion";

const configureAndConnectToSignalR = async ({roomName, setRolls, rolls, setConnection, setInvalidRollErrorShowing}) => {
    try {
        setRolls([]);
        const connection = new HubConnectionBuilder()
            .withUrl(`https://${process.env.REACT_APP_HOST}/roomhub`)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        connection.on("RoomJoined", (rollHistory) => {
            if(rollHistory) {
                setRolls(rollHistory);
            }
        });

        connection.on("PublishRoll", (roll) => {
            if(!rolls){
                setRolls([roll]);
                return;
            }
            setRolls(rolls => [...rolls, roll]);
        });

        connection.on("InvalidExpression", () => {
            setInvalidRollErrorShowing(true);
            setTimeout(() => {
                setInvalidRollErrorShowing(false);
            }, 2000);
        });
        
        await connection.start();

        const password = '';
        await connection.invoke("JoinRoom", roomName, password);

        setConnection(connection);
    } catch(e) {
        console.log(e);
    }
}

const Room = ({addRoom, leaveRoom}) => {
    const [connection, setConnection] = useState();
    const [invalidRollErrorShowing, setInvalidRollErrorShowing] = useState(false);
    const [rolls, setRolls] = useState([]);
    const [nickname, setNickname] = UseLocalStorage("nickname", getRandomName());
    const { roomName } = useParams();
    const history = useHistory();
    
    useEffect(() => {
        document.title = "Roll Dice With X :" + roomName;
        addRoom(roomName);
    }, []);
    
    useEffect(() => {
        if(connection) {
            connection.stop();
        }
        setConnection(undefined);
        configureAndConnectToSignalR({roomName, setRolls, rolls, setConnection, setInvalidRollErrorShowing})
            .then(() => console.log("Connected to room", roomName));
    }, [roomName]);
    
    const sendRoll = async (expression) => {
        try {
            await connection.invoke("Roll", roomName, nickname, expression)
        } catch(e) {
            console.log(e);
        }
    }
    
    const LeaveRoom = () => {
        leaveRoom(roomName);
        connection.stop();
        history.push("/");
    };
    
    const alertMotionHide = {
        initial: {
            opacity: 1
        },
        target: {
            opacity: 0,
            transition: {
                duration: 2
            }
        }
        
    }
    
    const alertMotionShow = {
        initial: {
            opacity: 0
        },
        target: {
            opacity: 1,
            transition: {
                duration: 0.5,
            }
        }
    }
    
    if(!connection) 
        return <Connecting/>
    
    return <Container>
        <Container>
            <RollInput sendRoll={sendRoll}/>
            {invalidRollErrorShowing && <motion.div variants={invalidRollErrorShowing ? alertMotionShow : alertMotionHide} initial="initial" animate="target">
                <Alert variant="danger">
                    Invalid roll expression!
                </Alert>
            </motion.div>}
            <Button onClick={LeaveRoom}>Leave room</Button>
        </Container>
        <Rolls rolls={rolls}/>
    </Container>
}

export default Room;