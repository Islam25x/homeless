import { useGetNotificationQuery } from "../../../RTK/NotificationApi/NotificationApi";
import { Card, Container, Spinner } from "react-bootstrap";
import "./Notification.css";
import { Link } from "react-router-dom";


function Notification() {
    const userId = localStorage.getItem("userId") || "";
    const {
        data: notifications,
        isLoading: loadingNotifications,
    } = useGetNotificationQuery({ userId: Number(userId) });

    return (
        <Container className="notification-container mt-4">
            <h4 className="mb-4">Notifications</h4>

            {loadingNotifications ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : notifications && notifications.length > 0 ? (
                notifications.map((notif) => (
                    <Link to={notif.notificationType === 'Message' ? `/Chat` : `/RentalsDetails/${notif.notificationTypeId}` }>
                        <Card key={notif.id} className="notification-card mb-3">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Card.Title className="notification-title">
                                            {notif.notificationType}
                                        </Card.Title>
                                    </div>
                                    <div className="text-muted small notification-date">
                                        {new Date(notif.actionDate).toLocaleString()}
                                    </div>
                                </div>
                                <Card.Text className="notification-desc">
                                    {notif.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))
            ) : (
                <div className="text-muted">No notifications found.</div>
            )}
        </Container>
    );
}

export default Notification;
