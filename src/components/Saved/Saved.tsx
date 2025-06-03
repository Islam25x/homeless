import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetSavedPostsQuery } from "../RTK/SaveSlice/SaveApi";
import LogedHeader from "../Headers/LogedHeader/LogedHeader";
import { getImageSrc } from "../../utils/imageHelpers";
import { useEffect } from "react";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Saved() {
    const userId = JSON.parse(localStorage.getItem('userId') || '{}');
    const { data, isLoading, error, refetch } = useGetSavedPostsQuery({ tenantId: userId });

    useEffect(() => {
        refetch();
    }, []);

    const SavedPosts = data?.filter((SavedPost)=> SavedPost.status !== 'rented')

    return (
        <section id='Saved'>
            <LogedHeader />
            <Container>
                <h2 className="text-center mb-4">Saved Rentals</h2>
                <Row>
                    {isLoading ? (
                        <p className="text-center">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-danger">Error loading properties.</p>
                    ) : SavedPosts?.length === 0 ? (
                        <p className="text-center">No properties found.</p>
                    ) : (SavedPosts?.map((property) => (
                        <Col key={property.id} lg={3} md={6} sm={12}>
                            <Link to={`/RentalsDetails/${property.id}`}>
                                <Card className="card mt-4">
                                    <Card.Img
                                        variant="top"
                                        src={getImageSrc(property.mainImage)}
                                        alt={property.title}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/default-image.png";
                                        }}
                                    />
                                    <Card.Body className="align-items-center mt-2 mx-2">
                                        <div className="d-flex mb-2">
                                            <FontAwesomeIcon className="mt-1 me-1" icon={faMapMarkerAlt} />
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
    )
}

export default Saved