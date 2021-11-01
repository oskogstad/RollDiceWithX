import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { motion} from "framer-motion";
import {useState, useEffect} from "react";

const NavMenu = ({ rooms }) => {
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {        console.log(window.innerWidth);
        setIsMobile(window.innerWidth < 992)};
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    });
    
    const brandMotion = {
        hidden: {
            opacity: 0,
            scale: 1.2,
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: .8,
                duration: 1,
                type: "spring",
            }
        }
    }
    
    const navBarMotion = {
        hidden: {
            opacity: 0,
            y: -50,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8
            }
        }
    }
    
    const navButtonMotion = {
        hover: {
            scale: 1.2,
            color: "#02060F"
        }
    }
    const navButtonMotionList = {
        hover: {
            scale: 1.2,
            originX: 0,
            color: "#02060F"
        }
    }
    
    const navText = (text) => {
        return <motion.div variants={isMobile ? navButtonMotionList : navButtonMotion} whileHover="hover">
            {text}
        </motion.div>
    }
    
    return <motion.div variants={navBarMotion} initial="hidden" animate="show">
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <motion.div variants={brandMotion} initial="hidden" animate="show">
                        RollDiceWithX
                    </motion.div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>{navText("Join Room")}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>{navText("About")}</Nav.Link>
                        </LinkContainer>
                        {rooms.map((room, index) => 
                            <LinkContainer key={index} to={`/room/${room}`}>
                                <Nav.Link>{navText(room)}</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar> 
    </motion.div>
}

export default NavMenu;