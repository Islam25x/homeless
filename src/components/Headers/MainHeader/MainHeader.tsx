import { useState } from "react";
import React from "react";
import { Container, Nav, Navbar, Button, Modal } from "react-bootstrap";
import Login from "../../LoginSystem/Login/Login";
import SignUp from "../../LoginSystem/SignUp/SignUp";

import './MainHeader.css'

const MainHeader: React.FC = () => {
  // Modal state
  const [show, setShow] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"Sign In" | "Register" | "">("");

  // Show modal with type
  const handleShow = (type: "Sign In" | "Register") => {
    setModalType(type);
    setShow(true);
  };

  // Close modal
  const handleClose = () => {
    setShow(false);
    setModalType("");
  };

  return (
    <header id="MainHeader">
      <Navbar expand="lg" className="sticky-top">
        <Container fluid className="ms-1 me-1">
          {/* Logo */}
          <Navbar.Brand href="/" data-aos="fade-right">
            <img src="images/logo.png" alt="logo" className="me-2" style={{ width: '50px' }} />
            TheHomeless.org
          </Navbar.Brand>

          {/* Responsive toggle */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Nav links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav ms-auto d-flex align-items-center">
              <Nav.Link onClick={() => handleShow("Register")} className="navlink" data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="500">
                Manage Rentals
              </Nav.Link>

              {/* Sign In & Register Links */}
              {["Sign In", "Register"].map((item) => (
                <Nav.Link
                  key={item}
                  className="navlink"
                  onClick={() => handleShow(item as "Sign In" | "Register")}
                  data-aos="fade-down"
                  data-aos-delay="300"
                  data-aos-duration="500"
                >
                  {item}
                </Nav.Link>
              ))}

              {/* Add Property Button (opens Register) */}
              <Button
                onClick={() => handleShow("Register")}
                variant="dark"
                data-aos="fade-down"
                data-aos-delay="500"
                data-aos-duration="500"
                className="ms-2"
              >
                Add Property
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Auth Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "Sign In" && <Login />}
          {modalType === "Register" && <SignUp />}
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default MainHeader;
