import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faChartColumn,
    faBell,
    faCircle
} from "@fortawesome/free-solid-svg-icons";
import { useGetDashBoardQuery } from "../../RTK/Admin/AdminApi";
import "./DashboardTop.css";

const DashboardTop = () => {
    const { data, isLoading, error } = useGetDashBoardQuery();

    const dashboardItems = [
        {
            titleKey: "Number Of Users",
            icon: <FontAwesomeIcon icon={faCircle} className="text-success" />,
            value: data?.numberOfUsers ?? "0", 
        },
        {
            titleKey: "Number Of Admins",
            icon: <FontAwesomeIcon icon={faClock} className="text-primary" />,
            value: data?.numberOfAdmins ?? "0",
        },
        {
            titleKey: "Number Of Tenants",
            icon: <FontAwesomeIcon icon={faChartColumn} className="text-purple" />,
            value: data?.numberOfTenants ?? "0",
        },
        {
            titleKey: "Number Of Landlords",
            icon: <FontAwesomeIcon icon={faBell} className="text-warning" />,
            value: data?.numberOfLandlords ?? "0",
        }
    ];

    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p className="text-danger">Failed to load dashboard data.</p>;
    }

    return (
        <section id="DashboardTop" className="container mt-5">
            <Row>
                {dashboardItems.map((item, index) => (
                    <Col key={index} lg={3} md={6} sm={12}>
                        <div className="dashboard-card">
                            <h6 className="dashboard-title">{item.titleKey}</h6>
                            <div className="dashboard-icon-wrapper">
                                {item.icon}
                                <span className="dashboard-value">{item.value}</span>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default DashboardTop;
