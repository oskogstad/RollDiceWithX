import {Container} from "react-bootstrap";
import {motion} from "framer-motion";

const svgMotion = {
    start: {
        opacity: 1,
        scale: 0
    },
    end: {
        opacity: 0,
        scale: 1.5,
        transition: {
            duration: 2,
            repeat: Infinity
        }
    }
}

const svgMotionDelayed = {
    start: {
        opacity: 1,
        scale: 0
    },
    end: {
        opacity: 0,
        scale: 1.5,
        transition: {
            delay: 0.75,
            duration: 2,
            repeat: Infinity
        }
    }
}

const Connecting = () => {
    return <Container>
        <motion.svg style={{ display: "block", margin: "auto" }} xmlns="http://www.w3.org/2000/svg" version="1.1">
            <motion.circle variants={svgMotion} initial="start" animate="end" cx="140" cy="60" r="20" stroke="black" strokeWidth="4" fill="none" />
            <motion.circle variants={svgMotionDelayed} initial="start" animate="end" cx="140" cy="60" r="20" stroke="black" strokeWidth="4" fill="none" />
        </motion.svg>
    </Container>
}

export default Connecting;