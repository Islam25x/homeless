import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const useSignalR = (hubUrl: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionState, setConnectionState] = useState<'Disconnected' | 'Connecting' | 'Connected'>('Disconnected');
    const [messages, setMessages] = useState<any[]>([]);
    const [UsersChat, setUsersChat] = useState<any[]>([]);

    useEffect(() => {
        let newConnection: signalR.HubConnection;

        const connect = async () => {
            if (connection) {
                await connection.stop();
            }

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

            newConnection.on('UpdateUserList', (updatedUsers: any[]) => {
            console.log("📨 Received updated user list from SignalR", updatedUsers);
            setUsersChat(updatedUsers);
        });

            try {
                setConnectionState('Connecting');
                await newConnection.start();
                setConnection(newConnection);
                setConnectionState('Connected');
            } catch (err) {
                console.error('❌ SignalR Connection failed:', err);
                setConnectionState('Disconnected');
            }
        };

        connect();

        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, [hubUrl]);

    return { connection, connectionState, messages, setMessages , UsersChat , setUsersChat };
};

export default useSignalR;
