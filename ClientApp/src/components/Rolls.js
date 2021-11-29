import Roll from "./Roll";
import {Container} from "react-bootstrap";
import {motion} from "framer-motion";

const Rolls = ({ rolls }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerDirection: -1
            }
        }
    }

    const header = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 1.5
            }
        }
    }

    const style = {
        display: "flex",
        flexDirection: "column-reverse"
    };
    
    return <Container>
        {!rolls || !rolls.length ? 
            <motion.h2 variants={header} initial="hidden" animate="show">Take a chance, roll the dice 🎲</motion.h2> :
            <div>
                <motion.ul style={style} className="rolls-list" 
                    variants={container} 
                    initial="hidden"
                    animate="show">
                        {rolls.map((roll, index) =>
                            <Roll key={index} roll={roll}/>
                        )}
                </motion.ul>
            </div>
        }    
    </Container>
}

export default Rolls;