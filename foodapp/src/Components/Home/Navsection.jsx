import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/Homeimg/logo.png"
import { NavLink } from "react-router-dom";
function Navsection() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-white p-0">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="" style={{width:"100px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto fw-bold ">
            <NavLink href="#features" className="text-decoration-none text-black pe-3">Offers</NavLink>
            <NavLink href="#features" className="text-decoration-none text-black pe-3">About</NavLink>
          </Nav>
          <Nav className="fw-bold ">
          <NavLink href="#pricing" className="text-decoration-none text-black pe-3" >Log In</NavLink>
            <NavLink href="#pricing" className="text-decoration-none text-black pe-3">Profile</NavLink> 
            <NavLink to='/cart' className="text-decoration-none text-black pe-3">Cart</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navsection;