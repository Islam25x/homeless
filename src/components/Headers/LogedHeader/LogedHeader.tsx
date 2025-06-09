import { useState } from "react";
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useLogoutMutation } from "../../RTK/Auth/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import { getImageSrc } from "../../../utils/imageHelpers";
import { useGetUserPhotoQuery } from "../../RTK/UserApi/UserApi";
import Notification from "./Notification/Notification";
import { useEffect } from "react";
import useSignalR from "./Notification/useSignalRNotify";
import "./LogedHeader.css";

const LogedHeader: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";
  const userRole = (localStorage.getItem("userRole") as 'tenant' | 'landlord') || "";
  const signalRUrl = `https://rentmate.runasp.net/notificationhub?userId=${userId}`;

  const {
    notifications: liveNotifications,
    setNotifications: setLiveNotifications,
    loadingNotifications
  } = useSignalR(signalRUrl);

  const { data: profileImage } = useGetUserPhotoQuery({
    id: Number(userId),
  });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed on backend", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("refreshToken");
    window.location.reload()
    navigate("/");
  };

  useEffect(() => {
    const count = liveNotifications.filter(n => !n.isSeen).length;
    setUnseenCount(count);
  }, [liveNotifications, unseenCount]);

  console.log('filter', unseenCount);


  return (
    <header id="LogedHeader" data-aos="fade-down">
      <Navbar expand="lg" className="sticky-top">
        <Container fluid className="ms-1 me-1">
          {/* Logo + Brand */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="images/logo.png"
              alt="logo"
              className="Logo me-2"
              style={{ width: "50px" }}
            />
            TheHomeless.org
          </Navbar.Brand>

          {/* Responsive Toggle */}
          <Navbar.Toggle aria-controls="navbar-content" />

          {/* Collapsible Nav Area */}
          <Navbar.Collapse id="navbar-content">
            <Nav className="ms-auto d-flex align-items-center position-relative">
              {/* Notification Icon */}
              <i
                className="notification fa-regular fa-bell"
                onClick={() => setShowNotification(!showNotification)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                {
                  unseenCount > 0 && (
                    < span className="notifyNumber">{unseenCount}</span>
                  )
                }

              </i>

              {/* Notification Dropdown */}
              {showNotification && (
                <div className="notificationResult">
                  <Notification
                    liveNotifications={liveNotifications}
                    setLiveNotifications={setLiveNotifications}
                    loadingNotifications={loadingNotifications}
                  />
                </div>
              )}


              {/* Chat Icon */}
              <Link to="/Chat">
                <i className="chat fa-regular fa-message mx-2"></i>
              </Link>

              {/* Profile Icon */}
              {profileImage?.image ? (
                <img
                  src={getImageSrc(profileImage.image)}
                  alt="Landlord"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              ) : (
                <div className="profile-photo">
                  <i className="def-user fa-regular fa-user"></i>
                </div>
              )}

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

                {userRole === "landlord" ? (
                  <NavDropdown.Item
                    as={Link}
                    to="/AddProperties"
                    className="d-flex"
                  >
                    <i className="fa-solid fa-building me-3 mt-1 align-content-center"></i>
                    <span className="mt-1">Add Properties</span>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    as={Link}
                    to="/MyProperties"
                    className="d-flex"
                  >
                    <i className="fa-solid fa-building me-3 mt-1 align-content-center"></i>
                    <span className="mt-1">My Properties</span>
                  </NavDropdown.Item>
                )}

                {userRole === "tenant" && (
                  <NavDropdown.Item
                    as={Link}
                    to="/savedProperties"
                    className="d-flex"
                  >
                    <i className="fa-solid fa-bookmark me-3 mt-1 align-content-center"></i>
                    <span className="mt-1">My Collection</span>
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={handleLogout} className="d-flex">
                  <i className="fa-solid fa-arrow-right-from-bracket me-3 mt-1 align-content-center"></i>
                  <span className="mt-1">Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
};

export default LogedHeader;
