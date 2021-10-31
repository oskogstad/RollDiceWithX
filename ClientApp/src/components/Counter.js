import {useState} from "react";
import { Container } from "react-bootstrap";

const Counter = () => {
    const [count = 0, setCount] = useState();

    return <Container>
        <div>
            <h1>Counter</h1>
            <p>This is a simple example of a React component.</p>
            <p aria-live="polite">Current count: <strong>{count}</strong></p>
            <button className="btn btn-primary" onClick={e => {setCount(count + 1)}}>Increment</button>
        </div>    
    </Container>
}

export default Counter;