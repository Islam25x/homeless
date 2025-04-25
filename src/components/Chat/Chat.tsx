import { Col, Container, Row } from "react-bootstrap"
import Users from "./Users/Users"
import Messages from "./Messages/Messages"
import LandlordHeader from "../Headers/LandlordHeader/LandlordHeader"


function Chat() {
    return (
        <section id="Chat">
            <LandlordHeader />
            <Container fluid style={{borderTop:'1px solid #bfbfbf'}}>
                <Row>
                    <Col lg={5} md={5} sm={12} style={{height:'90vh'}}>
                        <Users />
                    </Col>
                    <Col lg={7} md={7} style={{borderLeft:'1px solid black'}}>
                        <Messages />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Chat