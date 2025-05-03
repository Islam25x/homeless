import { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const useSignalR = (url: string, token: string) => {
    const [connection, setConnection] = useState<any>(null);
    const [connectionState, setConnectionState] = useState<HubConnectionState | null>(null);
    const [error, setError] = useState<string | null>(null);

    // دالة لبدء الاتصال
    const startConnection = async () => {
        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl(url, { accessTokenFactory: () => token })
                .build();

            newConnection.onclose(() => {
                setConnectionState(HubConnectionState.Disconnected);
                console.log("SignalR disconnected.");
            });

            newConnection.onreconnecting(() => {
                setConnectionState(HubConnectionState.Reconnecting);
                console.log("SignalR reconnecting...");
            });

            newConnection.onreconnected(() => {
                setConnectionState(HubConnectionState.Connected);
                console.log("SignalR reconnected.");
            });

            // محاولة بدء الاتصال
            await newConnection.start();
            setConnection(newConnection);
            setConnectionState(HubConnectionState.Connected);
            console.log("SignalR connected.");
        } catch (err: unknown) {
            // التحقق من نوع الخطأ إذا كان يحتوي على خاصية message
            if (err instanceof Error) {
                setError("SignalR connection error: " + err.message);
                console.error(err.message);
            } else {
                setError("An unknown error occurred");
                console.error("An unknown error occurred", err);
            }

            // إعادة المحاولة بعد فترة قصيرة
            setTimeout(startConnection, 3000); // إعادة المحاولة بعد 3 ثواني
        }
    };

    // استخدام useEffect لإدارة الاتصال
    useEffect(() => {
        startConnection();

        // تنظيف الاتصال عند التفريغ
        return () => {
            if (connection) {
                connection.stop();
                console.log("SignalR connection stopped.");
            }
        };
    }, [url, token]);

    return { connection, connectionState, error };
};

export default useSignalR;
