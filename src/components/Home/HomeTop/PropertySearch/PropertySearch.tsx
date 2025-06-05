import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertySearch.css";

const PropertySearch = () => {
    const [location, setLocation] = useState<string>("");
    const [fromPrice, setFromPrice] = useState<string>("");
    const [toPrice, setToPrice] = useState<string>("");
    const navigate = useNavigate();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const safeLocation = location.trim() || "any";
        const safeFrom = fromPrice.trim() || "0";
        const safeTo = toPrice.trim() || "9999999";

        navigate(`/SearchResult/${encodeURIComponent(safeLocation)}/${safeFrom}/${safeTo}`);
    };

    return (
        <Container className="property-search-container">
            <Form onSubmit={handleSearchSubmit}>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="search-heading">Search for available properties</h5>
                    <Button variant="primary" type="submit">Search Properties</Button>
                </div>
                <Row className="align-items-end">
                    <Col md={4}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup>
                            <Form.Control
                                placeholder="From price"
                                type="number"
                                value={fromPrice}
                                onChange={(e) => setFromPrice(e.target.value)}
                            />
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faDollarSign} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup>
                            <Form.Control
                                placeholder="To price"
                                type="number"
                                value={toPrice}
                                onChange={(e) => setToPrice(e.target.value)}
                            />
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faDollarSign} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default PropertySearch;
