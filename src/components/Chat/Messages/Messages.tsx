import { Container, Row, Col, Form, InputGroup, Button, Image } from 'react-bootstrap';
import './Messages.css';

const messages = [
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },

  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'assadsdsasdad',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'Islam',
    replyTo: 'you',
    text: 'saddsadasdda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=S'
  },
  {
    from: 'you',
    replyTo: 'Islam',
    text: 'saddsdadasda',
    isReply: true,
    avatar: 'https://via.placeholder.com/40?text=Y'
  }
];
function Messages() {
  return (
    <Container fluid className="chat-container">
      <Row>
        <Col className="chat-header d-flex align-items-center">
          <Image src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" roundedCircle className="chat-avatar" />
          <div className="chat-info ms-2">
            <div className="chat-name text-dark">Islam</div>
          </div>
        </Col>
      </Row>
      <Row className="chat-body">
        <Col>
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.from === 'you' ? 'from-you' : 'from-them'}`}>
              <div className="reply-to">{msg.from} replied to {msg.replyTo}</div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="chat-footer">
        <Col>
          <InputGroup>
            <Form.Control placeholder="Aa" className="chat-input" />
            <Button variant="primary">
            <i className="fa-solid fa-paper-plane"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages