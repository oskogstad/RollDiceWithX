import {Container} from "react-bootstrap";
import JoinRoomForm from './JoinRoomForm';
import Rolls from "./Rolls";
import RollInput from "./RollInput";
import { HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {useState} from "react";

const Room = () => {
    const [connection, setConnection] = useState();
    const [rolls, setRolls] = useState([]);
    const [user, setUser] = useState();
    const [roomName, setRoomName] = useState();
    
    const joinRoom = async (user, roomName) => {
        try {
            setUser(user);
            setRoomName(roomName);
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/roomhub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            connection.on("RoomJoined", (rollHistory) => {
                console.log("Got roll history", rollHistory);
                if(rollHistory) {
                    setRolls(rollHistory);
                }
            });

            connection.on("PublishRoll", (roll) => {
                console.log("Got roll from server:", roll, ", prev rolls be", rolls);
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
    
    const sendRoll = async (expression) => {
        try {
            await connection.invoke("Roll", roomName, user, expression)
        } catch(e) {
            console.log(e);
        }
    }
    
    return <Container>
        {!connection ? 
            <JoinRoomForm joinRoom={joinRoom}/> : 
            <Container>
                <RollInput sendRoll={sendRoll}/>
                <Rolls rolls={rolls}/>
            </Container>}
    </Container>
}

export default Room;