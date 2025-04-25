import React, { useState } from "react";
import { useGetPropertiesQuery } from "../../RTK/PropertySlice/apiSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./ExploreRentals.css";
import { Link } from "react-router-dom";

interface Property {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const ExploreRentals: React.FC = () => {
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { data: properties = [], isLoading, error } = useGetPropertiesQuery();

  const handleView = () => {
    setViewAll(!viewAll);
  };

  return (
    <section id="ExploreRentals">
      <Container>
        <h2 className="text-center mb-4">Explore Rentals In Cairo</h2>
        <Row>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">Error loading properties.</p>
          ) : properties.length === 0 ? (
            <p className="text-center">No properties found.</p>
          ) : (
            (viewAll ? properties : properties.slice(0, 4)).map((property: Property) => (
              <Col key={property.id} lg={3} md={6} sm={12}>
                <Link to={`/RentalsDetails/${property.id}`}>
                  <Card className="card mt-4">
                    <Card.Img
                      variant="top"
                      src={property.image}
                      alt={property.title}
                    />
                    <Card.Body className="text-center">
                      <Card.Title>{property.title}</Card.Title>
                      <Card.Text>Cairo</Card.Text>
                      <Card.Text>Price: ${property.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          )}
        </Row>

        {properties.length > 4 && (
          <div className="ExploreRentals-bottom text-center mt-4">
            <Button
              className={viewAll ? "view-more-btn active" : "view-more-btn"}
              variant="dark"
              onClick={handleView}
            >
              {viewAll ? "View Less" : "View More"}
            </Button>
          </div>
        )}

        <hr style={{ color: "gray" }} />
      </Container>
    </section>
  );
};

export default ExploreRentals;
