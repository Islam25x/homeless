import { Container, Row, Col, Card, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSearchPropertiesQuery } from "../RTK/Search/SearchApi";
import LogedHeader from "../Headers/LogedHeader/LogedHeader";
import MainHeader from "../Headers/MainHeader/MainHeader";
import { Link } from "react-router-dom";
import { getImageSrc } from "../../utils/imageHelpers";
import { BeatLoader } from "react-spinners";
import "./SearchResult.css";
function SearchResult() {
    
    const { location, from, to } = useParams<{
        location?: string;
        from?: string;
        to?: string;
    }>();


    const { data: properties, isLoading, error } = useSearchPropertiesQuery({
        location: location === "any" ? undefined : location,
        fromPrice: Number(from),
        toPrice: Number(to),
    });

    const filteredProperties = properties?.filter(
        (p) => p.propertyApproval === "accepted"
    );

    const userRole = localStorage.getItem("userRole") || '';
    if (isLoading) return (
        <div className="loading">
            <BeatLoader
                className='BeatLoader'
                color="#0a81ed"
                size={50}
            />
        </div>
    )

    return (
        <>
            {userRole ? <LogedHeader /> : <MainHeader />}

            <section id="SearchResult" className="py-4">
                <Container>
                    <h2 className="mb-4 text-center">Search Results</h2>


                    {/* حالة التحميل / الأخطاء */}
                    {isLoading && <p className="text-center mt-5">Loading...</p>}
                    {error && <p className="text-center mt-5 text-danger">Error loading data</p>}
                    {!isLoading && filteredProperties?.length === 0 && (
                        <p className="text-center mt-5 text-warning">No properties found.</p>
                    )}

                    {/* عرض النتائج */}
                    <Row className="g-4">
                        {filteredProperties?.map((property) => (
                            <Col key={property.id} lg={3} md={6} sm={12}>
                                <Link
                                    to={userRole === "" ? "/Login" : `/RentalsDetails/${property.id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={getImageSrc(property.mainImage)}
                                            alt={property.title}
                                            onError={(e) =>
                                                ((e.target as HTMLImageElement).src = "/default-image.png")
                                            }
                                        />
                                        <Card.Body className="text-center">
                                            <Card.Title>{property.title}</Card.Title>
                                            <Card.Text className="text-muted">
                                                {property.location}
                                            </Card.Text>
                                            <Card.Text>Price: ${property.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default SearchResult;
