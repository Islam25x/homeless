import { useState, useEffect } from "react";
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useLogoutMutation } from "../../RTK/Auth/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import { getImageSrc } from "../../../utils/imageHelpers";
import { useGetUserPhotoQuery } from "../../RTK/UserApi/UserApi";
import Notification from "./Notification/Notification";
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

  const { data: profileImage } = useGetUserPhotoQuery({ id: Number(userId) });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed on backend", error);
    }

    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const count = liveNotifications.filter(n => !n.isSeen).length;
    setUnseenCount(count);
  }, [liveNotifications]);

  // Prevent scroll when notification is shown on mobile
  useEffect(() => {
    if (showNotification && window.innerWidth < 576) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showNotification]);

  return (
    <header id="LogedHeader" data-aos="fade-down">
      <Navbar className="sticky-top">
        <Container fluid className="ms-1 me-1">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="images/logo.png"
              alt="logo"
              className="Logo me-2"
              style={{ width: "50px", height: "auto" }}
            />
            <span className="brand-text">TheHomeless.org</span>
          </Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center position-relative">
            <i
              className="notification fa-regular fa-bell"
              onClick={() => setShowNotification(!showNotification)}
            >
              {unseenCount > 0 && <span className="notifyNumber">{unseenCount}</span>}
            </i>

            {showNotification && (
              <div className="notificationResult">
                {/* Mobile close button */}
                <div className="d-flex justify-content-end p-2 d-md-none">
                  <button className="btn-close" onClick={() => setShowNotification(false)}></button>
                </div>
                <Notification
                  liveNotifications={liveNotifications}
                  setLiveNotifications={setLiveNotifications}
                  loadingNotifications={loadingNotifications}
                />
              </div>
            )}

            <Link to="/Chat">
              <i className="chat fa-regular fa-message mx-2"></i>
            </Link>

            {profileImage?.image ? (
              <div className="profile-photo" style={{backgroundColor:'transparent'}}>
                <img
                  src={getImageSrc(profileImage.image)}
                  alt="User"
                  style={{
                    width: "40px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <NavDropdown className="ms-4" title="."  id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/Account" className="d-flex">
                    <i className="def-user fa-regular fa-user me-3 mt-1"></i>
                    <span className="mt-1">Manage My Account</span>
                  </NavDropdown.Item>

                  {userRole === "landlord" ? (
                    <NavDropdown.Item as={Link} to="/AddProperties" className="d-flex">
                      <i className="fa-solid fa-building me-3 mt-1"></i>
                      <span className="mt-1">Add Properties</span>
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item as={Link} to="/MyProperties" className="d-flex">
                      <i className="fa-solid fa-building me-3 mt-1"></i>
                      <span className="mt-1">My Properties</span>
                    </NavDropdown.Item>
                  )}

                  {userRole === "tenant" && (
                    <NavDropdown.Item as={Link} to="/savedProperties" className="d-flex">
                      <i className="fa-solid fa-bookmark me-3 mt-1"></i>
                      <span className="mt-1">My Collection</span>
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item onClick={handleLogout} className="d-flex">
                    <i className="fa-solid fa-arrow-right-from-bracket me-3 mt-1"></i>
                    <span className="mt-1">Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <div className="profile-photo">
                <i className="def-user fa-regular fa-user"></i>
                <NavDropdown className="ms-4" title="." id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/Account" className="d-flex">
                    <i className="def-user fa-regular fa-user me-3 mt-1"></i>
                    <span className="mt-1">Manage My Account</span>
                  </NavDropdown.Item>

                  {userRole === "landlord" ? (
                    <NavDropdown.Item as={Link} to="/AddProperties" className="d-flex">
                      <i className="fa-solid fa-building me-3 mt-1"></i>
                      <span className="mt-1">Add Properties</span>
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item as={Link} to="/MyProperties" className="d-flex">
                      <i className="fa-solid fa-building me-3 mt-1"></i>
                      <span className="mt-1">My Properties</span>
                    </NavDropdown.Item>
                  )}

                  {userRole === "tenant" && (
                    <NavDropdown.Item as={Link} to="/savedProperties" className="d-flex">
                      <i className="fa-solid fa-bookmark me-3 mt-1"></i>
                      <span className="mt-1">My Collection</span>
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item onClick={handleLogout} className="d-flex">
                    <i className="fa-solid fa-arrow-right-from-bracket me-3 mt-1"></i>
                    <span className="mt-1">Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default LogedHeader;
