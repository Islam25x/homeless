import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPropertyByIdQuery } from '../RTK/PropertySlice/apiSlice';
import { useAcceptPostMutation, useDeletePostMutation } from '../RTK/Admin/AdminApi';
import { useSavePostMutation } from '../RTK/SaveSlice/SaveApi';
import { useEffect, useState } from 'react';

import './RentalsDetails.css';
import Comments from './Comments/Comments';

interface propertyImages {
  propertyImageId: number;
  image: string;
}

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

function RentalsDetails() {
  const { id } = useParams<{ id: string }>();
  const userId = localStorage.getItem('userId') || '';
  const userRole = localStorage.getItem('userRole') || '';
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments)
  }

  const { data: propertie, isLoading, error, refetch } = useGetPropertyByIdQuery({
    PropertyId: Number(id),
    userId: Number(userId),
  });



  const [AcceptLandlord, { isLoading: isAcceptLoading }] = useAcceptPostMutation();
  const [DeleteLandlord, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const [savePost] = useSavePostMutation();

  useEffect(() => {
    if (propertie) {
      setIsSaved(propertie.isSaved);
    }
  }, [propertie]);

  const handleAccept = async () => {
    try {
      await AcceptLandlord({ propertyId: Number(id) }).unwrap();
      refetch();
      alert('Property accepted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to accept property.');
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteLandlord({ propertyId: Number(id) }).unwrap();
      alert('Property deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete property.');
    }
  };

  const handleSave = async () => {
    try {
      await savePost({ tenantId: Number(userId), propertyId: propertie.id }).unwrap();
      setIsSaved(!isSaved); // تحديث مباشر
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (error || !propertie) return <p className="text-center mt-5 text-danger">Error loading property.</p>;

  return (
    <section id="RentalsDetails" className="py-4">
      <Container>
        <p className="text-muted" dir="ltr">
          Home / <span className="text-dark">{propertie.title}</span>
        </p>
        <Row>
          <Col lg={2} md={2} sm={4}>
            <div className="d-flex flex-column gap-2">
              {propertie.propertyImages.map((propertyImage: propertyImages) => (
                <div className="border p-1" key={propertyImage.propertyImageId}>
                  <img
                    src={getImageSrc(propertyImage.image)}
                    alt={propertie.title}
                    className="img-fluid w-100"
                  />
                </div>
              ))}
            </div>
          </Col>

          <Col lg={5} md={5} sm={8}>
            <div className="text-center">
              <img
                src={getImageSrc(propertie.mainImage)}
                alt={propertie.title}
                className="main-img"
              />
            </div>
          </Col>

          <Col lg={5} md={5} sm={8}>
            <div className="mt-3">
              <h3>{propertie.title}</h3>
              <h4 className="mt-3 text-success">${propertie.price}</h4>

              <div className="mt-3 d-flex align-items-center location-view">
                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                <span>{propertie.location || 'Unknown Location'}</span>
              </div>

              <div className="mt-2 d-flex align-items-center location-view">
                <i className="fas fa-eye text-primary me-2"></i>
                <span>{propertie.views || 0} Views</span>
              </div>

              <div className="mt-2 d-flex align-items-center location-view">
                {propertie.landlordImage && (
                  <img
                    src={getImageSrc(propertie.landlordImage)}
                    alt="Landlord"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                  />
                )}
                <span>{propertie.landlordName || 'Unknown Landlord'}</span>
              </div>

              <div className="mt-2 d-flex align-items-center location-view">
                <i className="fas fa-calendar-alt text-primary me-2"></i>
                <span>{propertie.createAt}</span>
              </div>

              <p className="mt-3">{propertie.description}</p>
              <hr />

              {userRole === 'admin' ? (
                <div className="right d-flex align-items-center gap-2">
                  <Button
                    variant="success"
                    className="rounded-circle d-flex align-items-center justify-content-center p-2"
                    style={{ width: '45px', height: '45px' }}
                    disabled={isAcceptLoading}
                    onClick={handleAccept}
                  >
                    <i className="fa-solid fa-check"></i>
                  </Button>

                  <Button
                    variant="danger"
                    className="rounded-circle d-flex align-items-center justify-content-center p-2"
                    style={{ width: '45px', height: '45px' }}
                    disabled={isDeleteLoading}
                    onClick={handleDelete}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3 mt-3">
                  {userRole === 'tenant' && (<button className="btn Buy-Now btn-primary">Rent Now</button>)}
                  <button onClick={handleShowComments} className="btn btn-outline-primary">
                    <i className="fas fa-comment"></i>
                  </button>
                  {userRole === 'tenant' && (
                    <button
                      onClick={handleSave}
                      className={`btn btn-outline-primary ${isSaved ? 'active' : ''}`}
                    >
                      <i className={`fa-bookmark ${isSaved ? 'fas' : 'far'}`}></i>
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className={showComments ? 'd-block' : 'd-none'}>
              <Comments propertyId={propertie.id} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RentalsDetails;
