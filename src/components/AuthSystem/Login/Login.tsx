import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLoginMutation } from "../../RTK/Auth/AuthApi";
import { useNavigate, Link } from "react-router-dom";


interface FormData {
  name: string;
  password: string;
}

interface Errors {
  name?: string;
  password?: string;
  backendError?: string;
}

interface DecodedToken {
  role: string;
  name: string;
  exp: number;
  sub: string;
  [key: string]: any;
}

// فك التوكن يدويًا
const decodeToken = (token: string): DecodedToken => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await login(formData).unwrap();
      const { token, refreshToken } = response;

      if (token) {
        const decoded = decodeToken(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        // تخزين البيانات
        localStorage.setItem("token", token);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", decoded.sub);

        window.location.href = "/";
      } else {
        setErrors({ backendError: "Token not received from server." });
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setErrors({
        backendError: err?.data?.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <section id="Login">
      <Container>
        <Row>
          <Col lg={6} md={7} sm={12}>
            <div className="form-ctn">
              <div className="sign-header text-center">
                <h2>Sign into your account</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-top">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                  </div>

                  <div className="my-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                  </div>
                </div>

                <div className="form-bottom">
                  <p>
                    By submitting your info, you agree to our policy at{" "}
                    <span style={{ color: "#0f8ac0" }}>TheHomeless.org</span>
                  </p>
                  don't have account<Link className="ms-2" to='/Register'>Register</Link>
                  <button className="mt-3" type="submit" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>

                  {errors.backendError && (
                    <p className="text-danger mt-2">{errors.backendError}</p>
                  )}
                </div>
              </form>
            </div>
          </Col>
          <Col lg={6} md={5} sm={12}>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
