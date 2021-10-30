import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const NavMenu = () => {
    return (
          <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link> 
                    </LinkContainer>
                    <LinkContainer to="/counter">
                        <Nav.Link>Counter</Nav.Link>
                    </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    );
}

export default NavMenu;