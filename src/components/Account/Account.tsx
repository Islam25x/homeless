import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import "./Account.css";

// Components
import LandlordHeader from "../Headers/LogedHeader/LogedHeader";

const Account: React.FC = () => {

  const username: any = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = localStorage.getItem('userRole') || '';
  const firstName: string = username.name ? username.name.split(" ")[0] : "null";
  const lastName: string = username.name ? username.name.split(" ")[1] : "null";
  // State for uploaded image (future use)
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger hidden input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle uploaded image preview (optional to use)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="Account">
      {/* Header */}
      <LandlordHeader />
      <Container>
        {/* Top Navigation and Welcome Text */}
        <header className="d-flex justify-content-between mt-5">
          <p className="Path">
            <Link to='/'>Home</Link> /<span className="text-dark"> My Account</span>
          </p>
          <p className="welcome text-dark">
            Welcome!<span className="text-primary"> {username.name}</span>
          </p>
        </header>

        <Row className="my-4">
          {/* Left Sidebar Navigation */}
          <Col lg={4} md={4} sm={12}>
            <div className="left">
              <h6>Manage My Account</h6>
              <ul>
                <li className="text-primary">My Profile</li>
                <li>
                  {userRole === 'landlord' ? <Link to='/AddProperties'>Add Properties</Link> : <Link to='/MyProperties'>My Properties</Link>}
                </li>
                <li>
                  {userRole === 'landlord' ? '' : <Link to='/savedProperties'>My collection</Link>}
                </li>
              </ul>
            </div>
          </Col>

          {/* Right Content Area */}
          <Col lg={8} md={8} sm={12}>
            <div className="right">
              <div className="right-ctn">
                <h5 className="text-primary mb-4">Edit Your Profile</h5>

                {/* Avatar and Upload Button */}
                <div className="position-relative d-flex justify-content-center">
                  <div
                    className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white fs-2"
                    style={{ width: "96px", height: "96px", overflow: "hidden" }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Avatar"
                        className="w-100 h-100 rounded-circle object-fit-cover"
                      />
                    ) : (
                      "I"
                    )}
                  </div>

                  {/* Upload Button */}
                  <button
                    className="btn btn-dark position-absolute rounded-circle p-0 upload-btn"
                    onClick={handleUploadClick}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>

                {/* Profile Fields */}
                <div className="name d-flex justify-content-between mt-4">
                  <div className="in-container">
                    <h6>First Name</h6>
                    <input value={firstName} type="text" disabled />
                  </div>
                  <div className="in-container ms-5">
                    <h6>Last Name</h6>
                    <input value={lastName} type="text" disabled />
                  </div>
                </div>

                <div className="name d-flex justify-content-between mt-3">
                  <div className="in-container">
                    <h6>Email</h6>
                    <input type="email" value={username.email} disabled />
                  </div>
                  <div className="in-container ms-5">
                    <h6>Address</h6>
                    <input type="text" placeholder="" disabled />
                  </div>
                </div>

                {/* Password Change Section */}
                <form className="mt-4">
                  <h2>Password Changes</h2>
                  <input
                    name="currentPassword"
                    type="password"
                    placeholder="Current Password"
                    required
                  />
                  <input
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    required
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    required
                  />

                  {/* Action Buttons */}
                  <div className="button-container mt-3">
                    <button type="button" className="cancel-btn">
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Account;
