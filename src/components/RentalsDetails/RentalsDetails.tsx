import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPropertyByIdQuery } from '../RTK/PropertySlice/apiSlice';

import './RentalsDetails.css'

function RentalsDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: propertie, isLoading, error } = useGetPropertyByIdQuery(Number(id));

  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (error || !propertie) return <p className="text-center mt-5 text-danger">Error loading property.</p>;

  return (
    <section id="RentalsDetails" className="py-4">
      <Container>
        <p className="text-muted" dir="ltr">
          Home / <span className="text-dark">{propertie.title}</span>
        </p>
        <Row>
          <Col lg={2} md={2} sm={4}>
            <div className="d-flex flex-column gap-2">
              {[...Array(4)].map((_, index) => (
                <div className="border p-1" key={index}>
                  <img
                    src={propertie.image}
                    alt={propertie.title}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          </Col>

          <Col lg={5} md={5} sm={8}>
            <div className="text-center">
              <img
                src={propertie.image}
                alt={propertie.title}
                className="img-fluid"
              />
            </div>
          </Col>

          <Col lg={5} md={5} sm={8}>
            <div className="mt-3">
              <h3>{propertie.title}</h3>
              <h4 className="mt-3">${propertie.price}</h4>
              <p className="mt-3">{propertie.description}</p>
              <hr />


              <div className="d-flex align-items-center gap-3 mt-3">

                <button className="btn Buy-Now btn-primary">Buy Now</button>
                <button className="btn btn-outline-primary">
                  <i className="fa-solid fa-comment"></i>
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RentalsDetails;
