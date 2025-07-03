import { useNotificationMarkAsSeenMutation } from "../../../RTK/NotificationApi/NotificationApi";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { notificationType } from "../../../../types/notificationType";
import "./Notification.css";
type NotificationProps = {
    liveNotifications: notificationType[];
    setLiveNotifications: React.Dispatch<React.SetStateAction<notificationType[]>>;
    loadingNotifications: boolean;
};

function Notification({ liveNotifications, setLiveNotifications , loadingNotifications }: NotificationProps) {



    const [notificationMarkAsSeen] = useNotificationMarkAsSeenMutation();

    const handleMarkAsSeen = async (id: number) => {
        try {
            await notificationMarkAsSeen({ notificationId: id }).unwrap();

            setLiveNotifications(prev =>
                prev.map(notif =>
                    notif.id === id ? { ...notif, isSeen: true } : notif
                )
            );
        } catch {
            
        }
    };


    return (
        <Container className="notification-container mt-4">
            <h4 className="mb-4">Notifications</h4>

            {loadingNotifications ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : liveNotifications && liveNotifications.length > 0 ? (
                liveNotifications.map((notif) => (
                    <Link key={notif.id} onClick={() => handleMarkAsSeen(notif.id)} to={notif.notificationType === 'Message' ? `/Chat` : `/RentalsDetails/${notif.notificationTypeId}`}>
                        <Card className="notification-card mb-3">
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
                                {
                                    notif.isSeen ? (
                                        <Card.Text className="notification-desc">
                                            {notif.description}
                                        </Card.Text>
                                    ) : (
                                        <Card.Text className="notification-desc fw-bold">
                                            {notif.description}
                                        </Card.Text>
                                    )}
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
