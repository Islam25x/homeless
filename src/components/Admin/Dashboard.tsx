import { Col, Container, Row } from "react-bootstrap"
import AdminNav from "../Headers/AdminNav/AdminNav"
import DashboardTop from "./DashboardTop/DashboardTop"



function Dashboard() {
  return (
    <section id='Admin'>
      <div className="Dashboard d-flex">
        <AdminNav />
        <div className="Dashboard-ctn" style={{width:'100%', paddingBottom:'2rem'}}>
          <DashboardTop />
          sdadd
        </div>
      </div>
      {/* <Container>
        <Row>
          <Col lg={3} md={3} sm={3}>
           
          </Col>
          <Col lg={9} md={9} sm={9}>
            
          </Col>
        </Row>
      </Container> */}
    </section>
  )
}

export default Dashboard