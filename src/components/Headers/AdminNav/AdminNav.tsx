import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../RTK/Auth/AuthApi";
import "./AdminNav.css";

interface AdminNavProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}

function AdminNav({ setActiveComponent, activeComponent }: AdminNavProps) {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap(); 
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
    <aside className="sidebar">
      <div className="logo">
        <img src="images/logo.png" alt="Logo" />
        <h2 className="d-none mt-2 d-lg-block">
          TheHomeless.org
        </h2>
      </div>

      <Nav className="flex-column mb-5">
        <p
          className={`nav-link my-0 ${activeComponent === "welcome" ? "active" : ""}`}
          onClick={() => setActiveComponent("welcome")}
        >
          <i className="fa-solid fa-chart-simple me-2 ms-1"></i>
          <span className="d-none d-lg-block">Welcome</span>
        </p>

        <p
          className={`nav-link my-0 ${activeComponent === "users" ? "active" : ""}`}
          onClick={() => setActiveComponent("users")}
        >
          <i className="fa-solid fa-user ms-1 me-2"></i>
          <span className="d-none d-lg-block">Users</span>
        </p>

        <p
          className={`nav-link my-0 ${activeComponent === "posts" ? "active" : ""}`}
          onClick={() => setActiveComponent("posts")}
        >
          <i className="fa-solid fa-building ms-1 me-2"></i>
          <span className="d-none d-lg-block">Posts</span>
        </p>
      </Nav>

      <div className="bottom">
        <Link
          to="/"
          onClick={handleLogout}
          className="nav-link mt-3"
          style={{ margin: '1rem' }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span className="ms-2 d-none d-lg-inline">Log out</span>
        </Link>
      </div>
    </aside>
  );
}

export default AdminNav;
