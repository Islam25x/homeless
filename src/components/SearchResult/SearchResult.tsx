import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSearchPropertiesQuery } from "../RTK/Search/SearchApi";
import MainHeader from "../Headers/MainHeader/MainHeader";
import LogedHeader from "../Headers/LogedHeader/LogedHeader";
import { Link } from "react-router-dom";
import './SearchResult.css';
import { useState } from "react";

// تحويل base64 إلى Blob
const base64ToBlob = (base64: string, mimeType: string) => {
    const byteString = atob(base64.split(",")[1]);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([byteArray], { type: mimeType });
};

// تجهيز صورة صحيحة
const getImageSrc = (image?: string) => {
    if (!image) return "/default-image.png";
    if (image.startsWith("data:image")) {
        const blob = base64ToBlob(image, "image/png");
        return URL.createObjectURL(blob);
    }
    if (image.length > 100 && !image.startsWith("http")) {
        return `data:image/png;base64,${image}`;
    }
    return image;
};


function SearchResult() {
    const { SearchResultLocation } = useParams<{ SearchResultLocation?: string }>();
    const [fromPrice, setFromPrice] = useState<number | undefined>();
    const [toPrice, setToPrice] = useState<number | undefined>();
    const [triggerSearch, setTriggerSearch] = useState(false);

    const shouldSkip =
        !triggerSearch && !(SearchResultLocation || fromPrice !== undefined || toPrice !== undefined);

    const { data: properties, isLoading, error } = useSearchPropertiesQuery(
        {
            location: SearchResultLocation || undefined,
            fromPrice,
            toPrice
        },
        { skip: shouldSkip }
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (fromPrice !== undefined && toPrice !== undefined) {
            const min = Math.min(fromPrice, toPrice);
            const max = Math.max(fromPrice, toPrice);
            setFromPrice(min);
            setToPrice(max);
        }

        setTriggerSearch(true);
    };

    const userRole: any = localStorage.getItem('userRole') || '';

    const filteredProperties = properties?.filter(
        (property:any) => property.propertyApproval === "accepted"
    );

    return (
        <>
            {userRole ? <LogedHeader /> : <MainHeader />}
            <section id="SearchResult" className="py-4">
                <Container>
                    <h2 className="mb-4 text-center">Search Results</h2>

                    {/* ✅ Filter Form */}
                    <Form className="mb-4" onSubmit={handleSearch}>
                        <Row className="justify-content-center g-3">
                            <Col md={3}>
                                <Form.Control
                                    type="number"
                                    placeholder="From Price"
                                    value={fromPrice ?? ""}
                                    onChange={(e) => setFromPrice(Number(e.target.value))}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    type="number"
                                    placeholder="To Price"
                                    value={toPrice ?? ""}
                                    onChange={(e) => setToPrice(Number(e.target.value))}
                                />
                            </Col>
                            <Col md={2}>
                                <Button type="submit" variant="primary" className="w-100">
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {/* ✅ Results */}
                    {isLoading && <p className="text-center mt-5">Loading...</p>}
                    {error && <p className="text-center mt-5 text-danger">You have to login</p>}
                    {!isLoading && filteredProperties?.length === 0 && (
                        <p className="text-center mt-5 text-warning">No properties found.</p>
                    )}

                    <Row className="g-4">
                        {filteredProperties?.map((property:any) => (
                            <Col key={property.id} lg={3} md={6} sm={12}>
                                <Link to={`/RentalsDetails/${property.id}`} className="text-decoration-none text-dark">
                                    <Card>
                                        <div className="card-top">
                                            <Card.Img
                                                variant="top"
                                                src={getImageSrc(property.mainImage)}
                                                alt={property.title}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/default-image.png";
                                                }}
                                                className="card-img-top"
                                            />
                                        </div>
                                        <Card.Body className="text-center">
                                            <Card.Title>{property.title}</Card.Title>
                                            <Card.Text className="text-muted">{property.location}</Card.Text>
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
