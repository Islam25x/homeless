import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faChartColumn,
    faBell,
    faCircle
} from "@fortawesome/free-solid-svg-icons";
import "./DashboardTop.css";

const dashboardItems = [
    {
        titleKey: "number Of Users",
        icon: <FontAwesomeIcon icon={faCircle} className="text-success" />,
        value: "13",
    },
    {
        titleKey: "number Of Admins",
        icon: <FontAwesomeIcon icon={faClock} className="text-primary" />,
        value: "1",
    },
    {
        titleKey: "number Of Tenants",
        icon: <FontAwesomeIcon icon={faChartColumn} className="text-purple" />,
        value: "10",
    },
    {
        titleKey: "number Of Landlords",
        icon: <FontAwesomeIcon icon={faBell} className="text-warning" />,
        value: "2",
    }
];

const DashboardTop = () => {

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
