import {Row, Col, ListGroup, Form, Image } from 'react-bootstrap';
import './Users.css';
import { Link } from 'react-router-dom';

const chats = [
  { name: 'Yara', time: '6h', unread: true, photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Osama Hisham', time: '1d', unread: false, photo: 'https://media.istockphoto.com/id/1443876461/photo/software-designer-speaking-to-his-client-on-the-phone-in-an-office.jpg?s=612x612&w=0&k=20&c=mgZ2JYqohw0LfRhNQdunJt2gVrGxl4EgPkDj8p2VIww=' },
  { name: 'Ahmed Mohamed', time: '4d', unread: true, photo: 'https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M=' },
  { name: 'Power Burger', time: '5d', unread: false, photo: 'https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M=' },
  { name: 'Islam', time: '1w', unread: true, photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Eng Khaled Elhadedy', time: '2w', unread: false, photo: 'https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M=' },
  { name: 'Amr Mohamed', time: '2w', unread: false, photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Yara', time: '6h', unread: true, photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Osama Hisham', time: '1d', unread: false, photo: 'https://media.istockphoto.com/id/1443876461/photo/software-designer-speaking-to-his-client-on-the-phone-in-an-office.jpg?s=612x612&w=0&k=20&c=mgZ2JYqohw0LfRhNQdunJt2gVrGxl4EgPkDj8p2VIww=' },
  { name: 'Ahmed Mohamed', time: '4d', unread: true, photo: 'https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M=' },
  { name: 'Power Burger', time: '5d', unread: false, photo: 'https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M=' },
  { name: 'Islam', time: '1w', unread: true, photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'Eng Khaled Elhadedy', time: '2w', unread: false, photo: 'https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M=' },
  { name: 'Amr Mohamed', time: '2w', unread: false, photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' },
  
];

function Users() {
  return (
      <Row>
        <Col className="messenger-panel">
          <h5 className="header my-3">Chats</h5>
          <Form.Control type="text" placeholder="Search Messenger" className="search-box" />
          <div className="tabs d-flex justify-content-between my-2">
            <span className="Inbox">Inbox</span>
            <Link to='Requests' className="align-content-center">Requests</Link>
          </div>
          <ListGroup className="chat-list">
            {chats.map((chat, index) => (
              <ListGroup.Item key={index} className={`chat-item ${chat.unread ? 'unread' : ''}`}>
                <div className="chat-user">
                  <Image src={chat.photo} roundedCircle className="user-photo" />
                  <div className="chat-info">
                    <strong>{chat.name}</strong>
                    <small>{chat.time}</small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
  )
}

export default Users