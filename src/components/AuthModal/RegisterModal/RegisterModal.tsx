import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useRegisterMutation } from "../../RTK/Auth/AuthApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../LoginSystem.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  Role: string;
  isProfessional: boolean;
  checked: boolean;
}
// Define the decoded token structure (adjust as needed)
interface DecodedToken {
  role: string;
  name: string;
  exp: number;
  [key: string]: any;
}

// Function to decode the token using atob
const decodeToken = (token: string): DecodedToken => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = JSON.parse(atob(base64));
  return decoded;
};

const RegisterModal = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    Role: "",
    isProfessional: false,
    checked: false,
  });

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userData = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.Role,
      isProfessional: formData.isProfessional,
    };
  
    try {
      const response = await register({ userDto: userData, role: formData.Role }).unwrap();
  
      // تحقق مما إذا كانت الاستجابة تحتوي على token (أي Tenant)
      if (response && "token" in response) {
        const token = response.token;
        const refreshToken = response.refreshToken;
  
        const decoded = decodeToken(token);
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
  
        localStorage.setItem("token", token);
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", decoded.sub);
  
        toast.success("Signed up successfully");
        navigate("/");
        window.location.reload()
      } else{
        toast.success("Registered successfully. Please wait for approval.");
        navigate("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Registration failed. Please try again.");
    }
  };
  


  // Safe error casting
  const fieldErrors = (error && "data" in error && (error as any).data?.errors) || {};
  const globalMessage = (error && "data" in error && (error as any).data?.message) || "";

  return (
    <section id="RegisterModal">
      <Container>
        <div className="sign-header text-center">
          <h2>Create an Account</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-top">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {fieldErrors.username && <p className="text-danger">{fieldErrors.username}</p>}
            </div>

            <div className="my-3">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && <p className="text-danger">{fieldErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {fieldErrors.password && <p className="text-danger">{fieldErrors.password}</p>}
            </div>

            <div className="select">
              <label htmlFor="Role" className="d-block mt-2">
                Select Role
              </label>
              <select
                id="Role"
                name="Role"
                value={formData.Role}
                onChange={handleChange}
              >
                <option value="">—Select Role—</option>
                <option value="Landlord">Landlord</option>
                <option value="Tenant">Tenant</option>
              </select>
              {fieldErrors.role && <p className="text-danger">{fieldErrors.role}</p>}
            </div>
          </div>

          <div className="form-bottom">
            <p>
              Message and data rates may apply. By submitting your phone number,
              you consent to being contacted by
              <span style={{ color: "#0f8ac0" }}>TheHomeless.org</span>
            </p>

            <div className="d-flex align-items-center mb-4">
              <input
                type="checkbox"
                id="industryProfessional"
                name="isProfessional"
                checked={formData.isProfessional}
                onChange={handleChange}
              />
              <label htmlFor="industryProfessional" className="mb-0 ms-2">
                I am an industry professional
              </label>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {globalMessage && <p className="text-danger mt-2">{globalMessage}</p>}
          </div>
        </form>
      </Container>
    </section>
  );
};

export default RegisterModal;
