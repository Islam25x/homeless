import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetSavedPostsQuery } from "../RTK/SaveSlice/SaveApi";
import LogedHeader from "../Headers/LogedHeader/LogedHeader";

const base64ToBlob = (base64: string, mimeType: string) => {
    const byteString = atob(base64.split(",")[1]);
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeType });
};

// وظيفة لعرض الصورة بناءً على كونها مشفرة بـ Base64 أو رابط URL أو فارغة
const getImageSrc = (image?: string) => {
    if (!image) {
        return "/default-image.png"; // رابط لصورة افتراضية داخل public folder
    }
    if (image.startsWith("data:image")) {
        const blob = base64ToBlob(image, "image/png");
        return URL.createObjectURL(blob);
    }
    // في حال كانت Base64 بدون الهيدر المناسب
    if (image.length > 100 && !image.startsWith("http")) {
        return `data:image/png;base64,${image}`;
    }
    return image;
};

interface Property {
    id: number;
    title: string;
    description: string;
    mainImage: string;
    price: number;
    propertyApproval: string
    location: string
}
function Saved() {
    const userId = JSON.parse(localStorage.getItem('userId') || '{}');
    const { data: SavedPosts = [], isLoading, error } = useGetSavedPostsQuery({ tenantId: userId });
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
                    ) : SavedPosts.length === 0 ? (
                        <p className="text-center">No properties found.</p>
                    ) : (SavedPosts.map((property: Property) => (
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
                                    <Card.Body className="text-center">
                                        <Card.Title>{property.title}</Card.Title>
                                        <Card.Text>{property.location}</Card.Text>
                                        <Card.Text>Price: ${property.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))
                    )}
                </Row>
                <hr style={{ color: "gray" }} />
            </Container>
        </section>
    )
}

export default Saved