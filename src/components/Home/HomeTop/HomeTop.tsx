import { useSpring, animated } from '@react-spring/web'
import { useGetUserStatisticsQuery } from '../../RTK/UserApi/UserApi';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import PropertySearch from "./PropertySearch/PropertySearch";
import "./HomeTop.css";

// Animated number counter component
const Number: React.FC<{ n: number }> = ({ n }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
};
const userRole: string = localStorage.getItem('userRole') || '';
const HomeTop = () => {
  const { data } = useGetUserStatisticsQuery()
  return (
    <main>
      <Container fluid>
        <Row>
          <Col lg={5} md={5} sm={12} data-aos="fade-right">
            <div className="home-ctn">
              <h1>Find A House That Suit You</h1>
              <p>Want to find a home? We are ready to help you find one that suits your lifestyle and needs</p>
              {
                userRole === '' && <Link to='Login'>
                  <button>Get Started</button>
                </Link>
              }
              {data && (
                <Row className="stats mt-5">
                  <Col>
                    <Number n={data.numberOfUsers} />
                    <p>Number of Users</p>
                  </Col>
                  <Col>
                    <Number n={data.numberOfProperties} />
                    <p>Listed Properties</p>
                  </Col>
                  <Col>
                    <Number n={data.numberOfLandlords} />
                    <p>Number of Landlords</p>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
          <Col lg={7} md={7} data-aos="fade-left">
            <img src="images\home copy svg.svg" alt="homeImage" style={{ width: '100%' , height:'100%'}} />
          </Col>
        </Row>
        <div className="search">
          <PropertySearch />
        </div>
      </Container>
    </main>
  );
};

export default HomeTop;
