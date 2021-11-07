import {Form, Button} from "react-bootstrap";
import {useState} from "react";

const RollInput = ({sendRoll}) => {
    const [rollExpression, setRollExpression] = useState();
    
    return <Form className="roll-input-form" onSubmit={event => {
        event.preventDefault();
        sendRoll(rollExpression);
    }}>
        <Form.Group>
            <Form.Control placeholder="e.g. 2d6+2d8+10" 
                          onChange={
                              event => setRollExpression(event.target.value)} />
        </Form.Group>
        <Button type="submit" disabled={!rollExpression}>Roll!</Button>
    </Form>
}

export default RollInput;