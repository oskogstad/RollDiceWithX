import Roll from "./Roll";
import {Container} from "react-bootstrap";

const Rolls = ({ rolls }) => {
    console.log("Rolls got rolls array", rolls)
    return <Container>
        {!rolls || !rolls.length ? 
            <span>Take a chance, roll the dice 🎲</span> :
            <div className="rolls-container">
                {rolls.map((roll, index) =>
                    <Roll key={index} roll={roll}/>
                )}
            </div>
        }    
    </Container>
}

export default Rolls;