import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    Form,
    Image,
    Spinner,
    Alert,
    InputGroup,
    Button,
} from 'react-bootstrap';
import { useGetusersChatQuery, useGetChatContentQuery, useSendMessageMutation } from '../RTK/ChatApi/ChatApi';
import useSignalR from './useSignalR';
import { HubConnectionBuilder } from '@microsoft/signalr';
import LogedHeader from '../Headers/LogedHeader/LogedHeader';
import './Chat.css';
import { Link } from 'react-router-dom';

interface ChatMessage {
    content: string;
    sender: string;
    timestamp?: string;
};

function Chat() {
    const storedId = localStorage.getItem('userId');
    const userId = storedId ? parseInt(storedId) : 0;
    const userRole = localStorage.getItem('userRole') || '';
    const username: any = JSON.parse(localStorage.getItem("user") || '[]');
    console.log('name', username?.name);
    console.log(userId);

    const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(null);
    const [messageContent, setMessageContent] = useState(''); // تعديل النوع إلى string
    const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]); // لحفظ الرسائل الحية

    const { data: usersInChat, isLoading, isError, refetch } = useGetusersChatQuery({
        userID: userId,
    });

    const {
        data: chatMessages,
        isLoading: isLoadingChat,
        isError: isErrorChat,
        refetch: refetchChat,
    } = useGetChatContentQuery(
        { userID: userId, receiverId: selectedReceiverId ?? 0 },
        { skip: selectedReceiverId === null }
    );
    console.log(chatMessages);

    const selectedUser = usersInChat?.find((user: any) => user.senderId === selectedReceiverId);
    const userImage = selectedUser?.senderImage || 'https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg?semt=ais_hybrid&w=740';
    const userName = selectedUser?.senderName || 'Select a user';

    const [sendMessage] = useSendMessageMutation();

    // استقبال الرسائل عبر SignalR
    const url = 'https://your-signalr-url'; // رابط الـ SignalR Hub الخاص بك
    const token = localStorage.getItem('authToken'); // أو أي طريقة للحصول على الـ token

    const newConnection = new HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => token || '', // تأكد من استخدام توكن صالح أو تمرير قيمة فارغة
        })
        .build();

    const handleSendMessage = async () => {
        if (messageContent.trim() === '') {
            alert('Please enter a message before sending.');
            return;
        }

        if (selectedReceiverId !== null) {
            try {
                // إرسال الرسالة
                await sendMessage({ userID: userId, receiverId: selectedReceiverId, message: messageContent });

                refetchChat(); // تحديث المحادثات بعد الإرسال
                setMessageContent(''); // إعادة تعيين الحقل بعد الإرسال
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    // دمج الرسائل من الـ API و SignalR
    const allMessages = [...(chatMessages || []), ...liveMessages];

    return (
        <>
            <LogedHeader />
            <Container fluid className="chat-container">
                <Row style={{ borderTop: '1px solid #c8c8c8' }}>
                    {/* Sidebar with users */}
                    <Col lg={4} md={4} sm={12} className="messenger-panel">
                        <h5 className="header my-3 text-dark">Chats</h5>
                        <Form.Control type="text" placeholder="Search Messenger" className="search-box" />
                        <div className="tabs d-flex justify-content-between my-2">
                            <span className="Inbox">Inbox</span>
                            {userRole !== 'tenant' && <Link to='Requests' className='text-primary'>Requests</Link>}
                        </div>

                        {isLoading && (
                            <div className="text-center mt-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        )}
                        {isError && (
                            <Alert variant="danger">
                                Failed to load chats.
                                <button onClick={refetch} className="btn btn-sm btn-outline-light mt-2">
                                    Retry
                                </button>
                            </Alert>
                        )}

                        <ListGroup className="chat-list">
                            {usersInChat?.map((chat: any) => (
                                <ListGroup.Item
                                    key={chat.senderId}
                                    className={`chat-item ${chat.unread ? 'unread' : ''}`}
                                    onClick={() => setSelectedReceiverId(chat.senderId)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="chat-user">
                                        <Image
                                            src={chat.senderImage || 'https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg?semt=ais_hybrid&w=740'}
                                            roundedCircle
                                            className="user-photo"
                                        />
                                        <div className="chat-info">
                                            <strong>{chat.senderName}</strong>
                                            <small>{chat.time}</small>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    {/* Chat content */}
                    <Col lg={8} md={8} sm={12} className="chat-container">
                        {selectedReceiverId === null ? (
                            <p className="text-muted text-center mt-5">Select a chat to view messages</p>
                        ) : (
                            <>
                                <div className="chat-header d-flex align-items-center">
                                    <Image
                                        src={userImage}
                                        roundedCircle
                                        className="chat-avatar"
                                    />
                                    <div className="chat-info ms-2">
                                        <div className="chat-name text-dark">{userName}</div>
                                    </div>
                                </div>

                                <div className="chat-body">
                                    {isLoadingChat ? (
                                        <div className="text-center mt-5">
                                            <Spinner animation="border" />
                                        </div>
                                    ) : isErrorChat ? (
                                        <Alert variant="danger" className="text-center">Failed to load messages</Alert>
                                    ) : (
                                        <div className="messages p-3">
                                            {allMessages?.length ? (
                                                allMessages.map((msg: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className={`message-bubble ${msg.senderName === username.name ? 'from-you' : 'from-them'}`}
                                                    >
                                                        <div className="message-text">{msg.content}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted">No messages yet.</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="chat-footer">
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Aa"
                                            className="chat-input"
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                        />
                                        <Button variant="primary" onClick={handleSendMessage}>
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </Button>
                                    </InputGroup>
                                </div>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Chat;
