import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-4">Simple UI App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-center">
            <Nav.Link as={Link} to="/" className="fs-5 mx-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fs-5 mx-3">About</Nav.Link>
            <Nav.Link as={Link} to="/login" className="fs-5 mx-3">
              <button className="btn btn-outline-light">Login</button>
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="fs-5 mx-3">
              <button className="btn btn-outline-light">Register</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;