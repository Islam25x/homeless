import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminNav.css"
function AdminNav() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <img src="images\logo.png" alt="" />
                <h2 className="d-none mt-2 d-lg-block">
                    TheHomeless.org
                </h2>
            </div>

            <Nav className="flex-column mb-5">
                <Nav.Link as={Link} to="/Dashboard" className="nav-link active">
                    <i className="fa-solid fa-chart-simple me-2 ms-1"></i>
                    <span className="d-none d-lg-block">Welcome</span>
                </Nav.Link>

                <Nav.Link as={Link} to="/NewPrediction" className="nav-link">
                    <i className="fa-solid fa-user ms-1 me-2"></i>
                    <span className="d-none d-lg-block">Users</span>
                </Nav.Link>

                <Nav.Link as={Link} to="/History" className="nav-link">
                    <i className="fa-solid fa-building ms-1 me-2"></i>
                    <span className="d-none d-lg-block">Posts</span>
                </Nav.Link>
            </Nav>

            <div className="bottom">

                <Link to="/" className="nav-link mt-3">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="ms-2 d-none d-lg-inline">Log out</span>
                </Link>
            </div>
        </aside>
    )
}

export default AdminNav