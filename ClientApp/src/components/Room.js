import {useParams} from "react-router-dom";
import React from 'react';
import {Container} from "react-bootstrap";

const Room = () => {
    let { roomName } = useParams();
    
    return(
        <Container>
            {roomName}
        </Container>
    );
}

export default Room;