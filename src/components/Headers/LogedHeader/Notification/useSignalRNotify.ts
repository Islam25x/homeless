import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useGetNotificationQuery } from '../../../RTK/NotificationApi/NotificationApi';
import { notificationType } from '../../../../types/notificationType';

const useSignalR = (hubUrl: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionState, setConnectionState] = useState<'Disconnected' | 'Connecting' | 'Connected'>('Disconnected');
    const [notifications, setLiveNotifications] = useState<notificationType[]>([]);
    const [liveUnSeenNotif, setLiveUnSeenNotif] = useState<{ numOfUnSeenNotififcations: number }>({ numOfUnSeenNotififcations: 0 });

    const userId = localStorage.getItem("userId") || "";

    const {
        data: initialNotifications,
        isLoading: loadingNotifications,
        refetch
    } = useGetNotificationQuery({ userId: Number(userId) });

    useEffect(() => {
        if (initialNotifications) {
            setLiveNotifications(initialNotifications);
        }
    }, [initialNotifications]);

    useEffect(() => {
        let newConnection: signalR.HubConnection;

        const connect = async () => {
            if (connection) await connection.stop();

            newConnection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl, {
                    accessTokenFactory: () => localStorage.getItem('token') || '',
                })
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();

            newConnection.onreconnecting(() => setConnectionState('Connecting'));
            newConnection.onreconnected(() => setConnectionState('Connected'));
            newConnection.onclose(() => setConnectionState('Disconnected'));

            const receiveNotification = (newNotification: notificationType) => {
                console.log('📥 Received via SignalR:', newNotification);
                setLiveNotifications(prev => [newNotification, ...prev]);
                toast.info(newNotification.description || "📢 New Notification");
            };

            const receiveUnseenCount = (unSeenNotif: { numOfUnSeenNotififcations: number }) => {
                console.log('📥 Received unseen count via SignalR:', unSeenNotif);
                setLiveUnSeenNotif(unSeenNotif);
            };

            newConnection.on('ReceiveNotification', receiveNotification);
            newConnection.on('ReceiveUnseenCount', receiveUnseenCount);

            try {
                setConnectionState('Connecting');
                await newConnection.start();
                setConnection(newConnection);
                setConnectionState('Connected');
                console.log('✅ SignalR connected.');
            } catch (err) {
                console.error('❌ SignalR connection failed:', err);
                setConnectionState('Disconnected');
            }

            return () => {
                newConnection.off('ReceiveNotification', receiveNotification);
                newConnection.off('ReceiveUnseenCount', receiveUnseenCount);
                newConnection.stop();
            };
        };

        connect();

        return () => {
            if (newConnection) newConnection.stop();
        };
    }, [hubUrl]);

    return {
        connection,
        connectionState,
        notifications,
        setNotifications: setLiveNotifications,
        liveUnSeenNotif,
        setLiveUnSeenNotif,
        loadingNotifications
    };
};

export default useSignalR;
