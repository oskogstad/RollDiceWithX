import {Container, Button} from "react-bootstrap";
import Rolls from "./Rolls";
import RollInput from "./RollInput";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {useEffect, useState} from "react";
import Connecting from "./Connecting";
import {UseLocalStorage} from "../utils/UseLocalStorage";
import {getRandomName} from "../utils/RandomName";
import {useParams, useHistory} from "react-router-dom";

const configureAndConnectToSignalR = async ({roomName, setRolls, rolls, setConnection}) => {
    try {
        setRolls([]);
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/roomhub")
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
        configureAndConnectToSignalR({roomName, setRolls, rolls, setConnection})
            .then(console.log("Connected to room", roomName));
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
    
    if(!connection) 
        return <Connecting/>
    
    return <Container>
        <Container>
            <RollInput sendRoll={sendRoll}/>
            <Button onClick={LeaveRoom}>Leave room</Button>
        </Container>
        <Rolls rolls={rolls}/>
    </Container>
}

export default Room;