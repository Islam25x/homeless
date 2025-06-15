import { useState } from "react";
import {
  useGetPropertyPaginationQuery,
  useGetNumberOfPagesQuery,
  useGetNumberOfLandlordPagesQuery,
  useGetPropertyLandlordPaginationQuery,
} from "../../RTK/PropertyApi/PropertyApi";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getImageSrc } from "../../../utils/imageHelpers";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ExploreRentals.css";

const ExploreRentals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const userRole: string = localStorage.getItem("userRole") || "";
  const userId: string = localStorage.getItem("userId") || "";

  // Call all hooks unconditionally
  const {
    data: totalPagesLandlord,
  } = useGetNumberOfLandlordPagesQuery({ landlordId: Number(userId) });
  const { data: totalPagesTenant } = useGetNumberOfPagesQuery();

  const {
    data: landlordProperties = [],
    isLoading: isLoadingLandlord,
    error: errorLandlord,
  } = useGetPropertyLandlordPaginationQuery({
    pageNumber: currentPage,
    landlordId: Number(userId),
  });

  const {
    data: tenantProperties = [],
    isLoading: isLoadingTenant,
    error: errorTenant,
  } = useGetPropertyPaginationQuery({ pageNumber: currentPage });

  // Choose data based on role
  const isLandlord = userRole === "landlord";

  const totalPages = isLandlord ? totalPagesLandlord : totalPagesTenant;
  const properties = isLandlord ? landlordProperties : tenantProperties;
  const isLoading = isLandlord ? isLoadingLandlord : isLoadingTenant;
  const error = isLandlord ? errorLandlord : errorTenant;

  const filteredProperties = isLandlord
    ? properties.filter((p) => p.propertyApproval === "accepted")
    : properties.filter(
        (p) => p.propertyApproval === "accepted" && p.status === "available"
      );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (!totalPages || totalPages < 2) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{pages}</Pagination>;
  };

  return (
    <section id="ExploreRentals">
      <Container>
        <div
          className="BestSelling-Top d-flex justify-content-between flex-wrap"
          data-aos="fade-right"
        >
          <h2 className="text-center mb-4">
            {isLandlord ? "My Properties" : "Explore Rentals"}
          </h2>
        </div>

        <Row>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">Error loading properties.</p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-center">No properties found.</p>
          ) : (
            filteredProperties.map((property) => (
              <Col
                key={property.id}
                lg={3}
                md={6}
                sm={12}
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <Link
                  to={
                    userRole === "" ? "/Login" : `/RentalsDetails/${property.id}`
                  }
                >
                  <Card className="card mt-4">
                    <Card.Img
                      variant="top"
                      src={getImageSrc(property.mainImage)}
                      alt={property.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default-image.png";
                      }}
                    />
                    <Card.Body className="align-items-center">
                      <div className="d-flex mb-2">
                        <FontAwesomeIcon className="mt-1" icon={faMapMarkerAlt} />
                        <Card.Text>{property.location}</Card.Text>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center location-view">
                          <i className="fas fa-eye text-primary me-2"></i>
                          <span>{property.views || 0} Views</span>
                        </div>
                        <div className="d-flex align-items-center location-view">
                          <img
                            src={
                              property.landlordImage
                                ? getImageSrc(property.landlordImage)
                                : "https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg"
                            }
                            alt="Landlord"
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                          <span>{property.landlordName || "Unknown Landlord"}</span>
                        </div>
                      </div>
                      <Card.Text>Price: ${property.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          )}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          {renderPagination()}
        </div>
      </Container>
    </section>
  );
};

export default ExploreRentals;
