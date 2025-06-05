import React from "react";
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useLogoutMutation } from "../../RTK/Auth/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import "./LogedHeader.css";

const LogedHeader: React.FC = () => {

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();


  const userRole: any = localStorage.getItem('userRole') || '';
  // Logout function
  const handleLogout = async () => {
    try {
      await logout().unwrap(); // إرسال طلب logout إلى الباك
    } catch (error) {
      console.error("Logout failed on backend", error);
    }

    // إزالة بيانات المستخدم من localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("refreshToken");

    // إعادة التوجيه
    navigate("/");
    window.location.reload();
  };

  return (
    <header id="LogedHeader" data-aos="fade-down">
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
                {
                  userRole === 'landlord' ? (
                    <NavDropdown.Item as={Link} to="/AddProperties" className="d-flex">
                      <i className="fa-solid fa-building me-3 mt-1 align-content-center"></i>
                      <span className="mt-1">Add Properties</span>
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item as={Link} to="/MyProperties" className="d-flex">
                      <i className="fa-solid fa-building me-3 mt-1 align-content-center"></i>
                      <span className="mt-1">My properties</span>
                    </NavDropdown.Item>
                  )
                }
                {
                  userRole === 'tenant' && (
                    <NavDropdown.Item as={Link} to="/savedProperties" className="d-flex">
                      <i className="fa-solid fa-bookmark me-3 mt-1 align-content-center"></i>
                      <span  className="mt-1">My collection</span>
                    </NavDropdown.Item>
                  )
                }


                {/* Logout Item */}
                <NavDropdown.Item onClick={handleLogout} className="d-flex">
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

export default LogedHeader;
