import { useState, useEffect } from 'react';
import {
    Container, Row, Col, ListGroup, Form, Image,
    Spinner, Alert, InputGroup, Button,
} from 'react-bootstrap';
import {
    useGetusersChatQuery,
    useGetChatContentQuery,
    useSendMessageMutation
} from '../RTK/ChatApi/ChatApi';
import { getImageSrc } from '../../utils/imageHelpers';
import LogedHeader from '../Headers/LogedHeader/LogedHeader';
import useSignalR from './useSignalR';
import { ChatMessage } from '../../types/ChatMessage';
import './Chat.css';

function Chat() {
    const storedId = localStorage.getItem('userId');
    const userId = storedId ? parseInt(storedId) : 0;
    const username: any = JSON.parse(localStorage.getItem("user") || '[]');
    const signalRUrl = `https://rentmate.runasp.net/chatHub?userId=${userId}`;

    const { connection, connectionState, messages, setMessages, UsersChat, setUsersChat } = useSignalR(signalRUrl);

    const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(null);
    const [messageContent, setMessageContent] = useState('');
    const [showChatOnly, setShowChatOnly] = useState(false);

    const { data: usersInChat, isLoading, isError, refetch } = useGetusersChatQuery({ userID: userId });

    const {
        data: chatMessages,
        isLoading: isLoadingChat,
        isError: isErrorChat,
        refetch: refetchChat,
    } = useGetChatContentQuery(
        { userID: userId, receiverId: selectedReceiverId ?? 0 },
        { skip: selectedReceiverId === null }
    );

    const [sendMessage] = useSendMessageMutation();

    useEffect(() => {
        if (usersInChat) {
            setUsersChat(usersInChat);
        }
    }, [usersInChat]);

    useEffect(() => {
        if (chatMessages) {
            setMessages(chatMessages);
        }
    }, [chatMessages]);

    const handleUserClick = (id: number) => {
        setSelectedReceiverId(id);
        if (window.innerWidth <= 768) {
            setShowChatOnly(true);
        }
    };

    const selectedUser = UsersChat?.find((user: any) => user.senderId === selectedReceiverId);
    const userImage = selectedUser?.senderImage || 'https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg?semt=ais_hybrid&w=740';
    const userName = selectedUser?.senderName || 'Select a user';

    const handleSendMessage = async () => {
        if (messageContent.trim() === '') return alert('Please enter a message before sending.');

        if (selectedReceiverId !== null) {
            try {
                await sendMessage({
                    userID: userId,
                    receiverId: selectedReceiverId,
                    message: messageContent,
                });

                setMessages((prev) => [
                    ...prev,
                    {
                        content: messageContent,
                        senderName: username.name,
                        timestamp: new Date().toISOString(),
                    },
                ]);

                setMessageContent('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    useEffect(() => {
        if (!connection || connectionState !== 'Connected') return;

        const receiveHandler = (message: ChatMessage) => {
            setMessages((prev) => [...prev, message]);
        };

        connection.on('ReceiveMessage', receiveHandler);

        return () => {
            connection.off('ReceiveMessage', receiveHandler);
        };
    }, [connection, connectionState]);

    return (
        <>
            <LogedHeader />
            <Container fluid className="chat-container">
                <Row style={{ borderTop: '1px solid #c8c8c8' }}>
                    {/* Sidebar */}
                    <Col
                        lg={4}
                        md={4}
                        sm={12}
                        className={`messenger-panel ${!showChatOnly ? 'show-messenger' : ''}`}
                        style={{ borderRight: '1px solid #bebebe' }}
                    >
                        <h5 className="header my-3 text-dark">Chats</h5>
                        <Form.Control type="text" placeholder="Search Messenger" className="search-box" />
                        <div className="tabs d-flex justify-content-between my-2">
                            <span className="Inbox">Inbox</span>
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
                            {UsersChat?.map((chat: any) => (
                                <ListGroup.Item
                                    key={chat.senderId}
                                    className={`chat-item ${chat.unread ? 'unread' : ''}`}
                                    onClick={() => handleUserClick(chat.senderId)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="chat-user">
                                        <Image
                                            src={chat.senderImage ? getImageSrc(chat.senderImage) : userImage}
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
                    <Col
                        lg={8}
                        md={8}
                        sm={12}
                        className={`chat-panel-mobile ${showChatOnly ? 'show-chat' : ''}`}
                    >
                        {selectedReceiverId === null ? (
                            <p className="text-muted text-center mt-5">Select a chat to view messages</p>
                        ) : (
                            <>
                                <div className="chat-header d-flex align-items-center">
                                    {showChatOnly && (
                                        <Button variant="link" onClick={() => setShowChatOnly(false)} className="me-2">
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </Button>
                                    )}
                                    <Image src={userImage ? getImageSrc(userImage) : userImage} roundedCircle className="chat-avatar" />
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
                                            {messages.map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`message-bubble ${msg.senderName === username.name ? 'from-you' : 'from-them'}`}
                                                >
                                                    <div className="message-text">{msg.content}</div>
                                                </div>
                                            ))}
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
            </Container >
        </>
    );
}

export default Chat;
