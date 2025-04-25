import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LandlordHeader from "../Headers/LandlordHeader/LandlordHeader";
import './AddProperties.css';

function AddProperties() {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log("Uploaded images:");
            Array.from(files).forEach((file) => {
                console.log(`Name: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
            });
        }
    };

    return (
        <section id='AddProperties'>
            <LandlordHeader />
            <Container className="add-property-form mt-5 p-4">
                <h2 className="text-center mb-4">Add New Property</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Property Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter property title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImages">
                        <Form.Label>Upload Images</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Write property description" />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter price" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="w-100">
                        Add Property
                    </Button>
                </Form>
            </Container>
        </section>
    );
}

export default AddProperties;
