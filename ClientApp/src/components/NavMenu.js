import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const NavMenu = () => {
    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand>RollDiceWithX</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Lobby</Nav.Link> 
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/room/test">
                        <Nav.Link>room/test</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/room/another">
                        <Nav.Link>room/another</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavMenu;