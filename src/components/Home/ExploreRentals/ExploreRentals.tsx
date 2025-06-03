import { useState } from "react";
import { useGetPropertiesQuery } from "../../RTK/PropertySlice/apiSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImageSrc } from "../../../utils/imageHelpers";
import { Property } from "../../../types/Property";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ExploreRentals.css";

const ExploreRentals: React.FC = () => {
  const [viewAll, setViewAll] = useState<boolean>(false);
  const userRole: string = localStorage.getItem("userRole") || "";
  const userId: string = localStorage.getItem("userId") || "";

  const { data: properties = [], isLoading, error } = useGetPropertiesQuery();
  const Posts = properties?.filter(
    (property: Property) => property.propertyApproval === "accepted" && property.status === "available"
  );
  const landlordRentals = properties.filter(
    (property: Property) => property.landlordId === Number(userId) && property.propertyApproval === "accepted" && property.landlordId === Number(userId)
  );

  const handleView = () => {
    setViewAll(!viewAll);
  };

  console.log(Posts);


  return (
    <section id="ExploreRentals">
      <Container>
        <div className="BestSelling-Top d-flex justify-content-between flex-wrap" data-aos="fade-right">
          <h2 className="text-center mb-4">
            {userRole === "landlord" ? "My properties" : "Explore Rentals"}
          </h2>
          {Posts.length > 4 && (
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
        </div>
        <Row>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">
              Error loading properties.
            </p>
          ) : Posts.length === 0 ? (
            <p className="text-center">No properties found.</p>
          ) : (
            (viewAll
              ? userRole === "landlord"
                ? landlordRentals
                : Posts
              : userRole === "landlord"
                ? landlordRentals.slice(0, 4)
                : Posts.slice(0, 4)
            ).map((property: Property) => (
              <Col key={property.id} lg={3} md={6} sm={12}
                data-aos="fade-up"
                data-aos-duration="1000">
                <Link to={userRole === "" ? "/Login" :`/RentalsDetails/${property.id}`}>
                  <Card className="card mt-4">
                    <Card.Img
                      variant="top"
                      src={getImageSrc(property.mainImage)}
                      alt={property.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/default-image.png";
                      }}
                    />
                    <Card.Body className="align-items-center">
                      <div className="d-flex mb-2">
                        <FontAwesomeIcon className="mt-1" icon={faMapMarkerAlt} />
                        <Card.Text>{property.location}</Card.Text>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className=" d-flex align-items-center location-view">
                          <i className="fas fa-eye text-primary me-2"></i>
                          <span>{property.views || 0} Views</span>
                        </div>
                        <div className="d-flex align-items-center location-view">
                          <img
                            src={property.landlordImage ? getImageSrc(property.landlordImage) : 'https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg'}
                            alt="Landlord"
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              marginRight: '10px',
                            }}
                          />
                          <span>{property.landlordName || 'Unknown Landlord'}</span>
                        </div>
                      </div>
                      {/* <Card.Title>{property.title}</Card.Title> */}
                      <Card.Text>Price: ${property.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ExploreRentals;
