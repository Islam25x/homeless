import { useGetNotificationQuery, useNotificationMarkAsSeenMutation } from "../../../RTK/NotificationApi/NotificationApi";
import { Card, Container, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import useSignalR from "./useSignalRNotify";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Notification.css";

function Notification() {
    const userId = localStorage.getItem("userId") || "";
    const signalRUrl = `https://rentmate.runasp.net/notificationhub?userId=${userId}`;

    const {
        connection,
        connectionState,
        notifications: liveNotifications,
        setNotifications: setLiveNotifications
    } = useSignalR(signalRUrl);

    const {
        data: initialNotifications,
        isLoading: loadingNotifications,
        refetch
    } = useGetNotificationQuery({ userId: Number(userId) });

    const [notificationMarkAsSeen] = useNotificationMarkAsSeenMutation();

    const handleMarkAsSeen = async (id: number) => {
        try {
            await notificationMarkAsSeen({ notificationId: id }).unwrap();
        } catch {
            toast.error("❌ Failed to mark notification as seen");
        }
    };
    useEffect(() => {
        if (initialNotifications) {
            setLiveNotifications(initialNotifications);
        }
    }, [initialNotifications]);
    console.log(liveNotifications);

    // استقبال الإشعارات من SignalR
    useEffect(() => {
        if (!connection || connectionState !== 'Connected') return;

        const receiveNotification = (newNotification: any) => {
            console.log('📥 Received via SignalR:', newNotification);
            setLiveNotifications(prev => [newNotification, ...prev]);
            toast.info(newNotification.description || "📢 New Notification");
        };

        connection.on('ReceiveNotification', receiveNotification);

        return () => {
            connection.off('ReceiveNotification', receiveNotification);
        };
    }, [connection, connectionState]);

    const allNotifications = [
        ...(liveNotifications || []),
        ...(initialNotifications || [])
    ];
    console.log('notifications', liveNotifications);

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
