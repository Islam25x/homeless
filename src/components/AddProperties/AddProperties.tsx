import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LandlordHeader from '../Headers/LogedHeader/LogedHeader';
import './AddProperties.css';
import { useAddPropertiesMutation } from '../RTK/PropertyApi/PropertyApi';
import { toast } from 'react-toastify';

function AddProperties() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [albumImages, setAlbumImages] = useState<File[]>([]);

    const [addProperty, { isLoading }] = useAddPropertiesMutation();

    const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImage(file);
        }
    };

    const handleAlbumImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length <= 4) {
            setAlbumImages(Array.from(files));
        } else if (files && files.length > 4) {
            toast.error("You can upload up to 4 album images only.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!mainImage) {
            toast.error("Main image is required");
            return;
        }

        if (albumImages.length === 0) {
            toast.error("You must upload at least one secondary image");
            return;
        }
        const userId: any = localStorage.getItem('userId') || '';
        

        const formData = new FormData();
        formData.append('LandlordId', userId); // Replace with dynamic user ID
        formData.append('Title', title);
        formData.append('MainImage', mainImage);
        formData.append('Description', description);
        formData.append('Price', price);
        formData.append('Location', location);

        albumImages.forEach((file) => {
            formData.append('Images', file); // backend expects multiple with same key
        });

        try {
            await addProperty(formData).unwrap();
            toast.success("✅ Property added successfully");

            // Clear form
            setTitle('');
            setDescription('');
            setPrice('');
            setLocation('');
            setMainImage(null);
            setAlbumImages([]);
        } catch (err: any) {
            toast.error("❌ Failed to add property:", err);
            toast.error(err?.data || "Failed to add property. Please try again.");
        }
    };

    return (
        <section id="AddProperties">
            <LandlordHeader />
            <Container className="add-property-form mt-5 p-4">
                <h2 className="text-center mb-4">Add New Property</h2>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Property Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter property title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMainImage">
                        <Form.Label>Main Image</Form.Label>
                        <Form.Control type="file" onChange={handleMainImageUpload} accept="image/*" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAlbumImages">
                        <Form.Label>Album Images (max 4)</Form.Label>
                        <Form.Control type="file" multiple onChange={handleAlbumImagesUpload} accept="image/*" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Write property description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button type="submit" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Add Property'}
                    </Button>
                </Form>
            </Container>
        </section>
    );
}

export default AddProperties;
