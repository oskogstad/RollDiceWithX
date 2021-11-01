import {Container} from "react-bootstrap";
import {motion} from "framer-motion";

const aboutMotion = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    }
}

const About = () => {
    return <Container>
        <motion.div variants={aboutMotion} initial="hidden" animate="show">
            About
        </motion.div>
    </Container>
}

export default About;