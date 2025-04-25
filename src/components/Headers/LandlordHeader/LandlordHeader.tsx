import React from "react";
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandLordHeader.css";

// Functional component with TS type
const LandlordHeader: React.FC = () => {
  return (
    <header id="LandlordHeader">
      <Navbar expand="lg" className="sticky-top">
        <Container fluid className="ms-1 me-1">

          {/* Logo + Brand */}
          <Navbar.Brand as={Link} to="/">
            <img src="images/logo.png" alt="logo" className="Logo me-2" style={{ width: '50px' }} />
            TheHomeless.org
          </Navbar.Brand>

          {/* Responsive Toggle */}
          <Navbar.Toggle aria-controls="navbar-content" />

          {/* Collapsible Nav Area */}
          <Navbar.Collapse id="navbar-content">
            {/* Optional navigation can go here */}
            <Nav className="ms-auto d-flex align-items-center">

              {/* Chat Icon */}
              <Link to='/Chat'>
                <i className="chat fa-regular fa-message me-2"></i>
              </Link>

              {/* Profile Icon */}
              <div className="profile-photo">
                <i className="def-user fa-regular fa-user"></i>
              </div>

              {/* Dropdown Menu */}
              <NavDropdown
                className="ms-4"
                title="."
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/Account" className="d-flex">
                  <i className="def-user fa-regular fa-user me-3 mt-1 align-content-center"></i>
                  <span className="mt-1">Manage My Account</span>
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/AddProperties" className="d-flex">
                  <i className="fa-solid fa-building me-3 mt-1 align-content-center"></i>
                  <span className="mt-1">Add Properties</span>
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/Cart/CheckOut" className="d-flex">
                  <i className="fa-solid fa-bag-shopping me-3 mt-1 align-content-center"></i>
                  <span className="mt-1">Manage Rentals</span>
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/Login" className="d-flex">
                  <i className="fa-solid fa-arrow-right-from-bracket me-3 mt-1 align-content-center"></i>
                  <span className="mt-1">Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default LandlordHeader;
