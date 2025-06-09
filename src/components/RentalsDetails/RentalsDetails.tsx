import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetPropertyByIdQuery, useAddPropertyAlbumImageMutation } from '../RTK/PropertySlice/apiSlice';
import { useAcceptPostMutation, useDeletePostMutation } from '../RTK/Admin/AdminApi';
import { useDeletePropertyImageMutation, useDeletePropertyMutation, useUpdatePropertyMutation } from '../RTK/PropertySlice/apiSlice';
import { useSavePostMutation } from '../RTK/SaveSlice/SaveApi';
import { useEffect, useRef, useState } from 'react';
import Comments from './Comments/Comments';
import { toast } from 'react-toastify';
import { useRentPropertyMutation, useDeleteRentPropertyMutation } from '../RTK/RentalRequestApi/RentalRequestApi';
import { getImageSrc } from '../../utils/imageHelpers';
import TenantRequests from './TenantRequests/TenantRequests';
import { useSendMessageMutation } from '../RTK/ChatApi/ChatApi';
import useSignalR from '../Chat/useSignalR';
import { useGetChatContentQuery } from '../RTK/ChatApi/ChatApi';
import { ChatMessage } from '../../types/ChatMessage';
import { BeatLoader } from 'react-spinners';
import './RentalsDetails.css';
import LogedHeader from '../Headers/LogedHeader/LogedHeader';



function RentalsDetails() {
  const { id } = useParams<{ id: string }>();
  const userId = localStorage.getItem('userId') || '';
  const userRole = localStorage.getItem('userRole') || '';
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTenantRequests, setShowTenantRequests] = useState(false);
  // rent Now 
  const fileInputRef = useRef<HTMLInputElement>(null);
  // add album img 
  const selectedFile = useRef<HTMLInputElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(null);
  const username: any = JSON.parse(localStorage.getItem("user") || '[]');
  const {
    data: chatMessages,
  } = useGetChatContentQuery(
    { userID: Number(userId), receiverId: selectedReceiverId ?? 0 },
    { skip: selectedReceiverId === null }
  );
  const signalRUrl = `https://rentmate.runasp.net/chatHub?userId=${userId}`;
  const { connection, connectionState, setMessages } = useSignalR(signalRUrl);
  const [formState, setFormState] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
  });
  const navigate = useNavigate();

  const { data: property, isLoading, error, refetch } = useGetPropertyByIdQuery({
    PropertyId: Number(id),
    userId: Number(userId),
  });

  console.log(property);

  const [AcceptLandlord, { isLoading: isAcceptLoading }] = useAcceptPostMutation();
  const [DeleteLandlord, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const [savePost] = useSavePostMutation();

  useEffect(() => {
    if (property) {
      setIsSaved(property.isSaved);
    }
  }, [property]);

  // signalR 
  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);
  useEffect(() => {
    if (!connection || connectionState !== 'Connected') return;

    const receiveHandler = (message: ChatMessage) => {
      console.log('✅ Received message via SignalR:', message);
      setMessages((prev) => [...prev, message]);
    };

    connection.on('ReceiveMessage', receiveHandler);

    return () => {
      connection.off('ReceiveMessage', receiveHandler);
    };
  }, [connection, connectionState]);

  // Admin Accept property 
  const handleAccept = async () => {
    try {
      await AcceptLandlord({ propertyId: Number(id) }).unwrap();
      refetch();
      navigate('/');
      toast('Property accepted successfully!');
    } catch (err) {
      console.error(err);
      toast('Failed to accept property.');
    }
  };

  // Admin Reject property 
  const handleDelete = async () => {
    try {
      await DeleteLandlord({ propertyId: Number(id) }).unwrap();
      refetch();
      navigate('/');
      toast('Property deleted successfully!');
    } catch (err) {
      console.error(err);
      toast('Failed to delete property.');
    }
  };

  const handleSave = async () => {
    try {
      await savePost({ tenantId: Number(userId), propertyId: property?.id }).unwrap();
      refetch();
      setIsSaved(!isSaved);
    } catch (err) {
      console.error("Failed to save post:", err);
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
    setShowTenantRequests(false);
  };
  const handleShowChat = () => {
    setShowChat(!showChat);
  };

  const handleShowTenantRequests = () => {
    setShowTenantRequests(!showTenantRequests);
    setShowComments(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);

    try {
      await RentProperty({
        FormData: formData,
        TenantId: Number(userId),
        PropertyId: Number(id),
      }).unwrap();
      refetch();
      toast.success('Rental request sent successfully!');
    } catch (err: any) {
      console.error(err);
      const message = err?.data || err?.error || 'حدث خطأ أثناء الإرسال';
      toast.error(message);
    }
  };

  const handleDeleteRent = async () => {
    try {
      await DeleteRentProperty({
        TenantId: Number(userId),
        PropertyId: Number(id),
      }).unwrap();
      refetch();
      toast.success('Rental deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete rental request.');
    }
  };
  const handleDeleteImage = async (propertyImageId: number) => {
    try {
      await deleteImage({ propertyImageId }).unwrap();
      refetch();
      toast.success('Image deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete Image.');
    }
  };

  // landlord Delete property 

  const handleDeleteProperty = async () => {
    try {
      await deleteProperty(
        { propertyId: property?.id }
      ).unwrap();
      refetch();
      toast.success('Property deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete Property.');
    }
  };
  // show Edit property Modal
  const openEditModal = () => {
    setFormState({
      title: property?.title || '',
      price: property?.price?.toString() || '',
      description: property?.description || '',
      location: property?.location || '',
    });
    setShowEditModal(true);
  };
  // Update Property in Modal
  const handleUpdateProperty = async () => {
    const formData = new FormData();
    formData.append('Title', formState.title);
    formData.append('Price', formState.price);
    formData.append('Location', formState.location);
    formData.append('Description', formState.description);

    if (selectedImage) {
      formData.append('Image', selectedImage);
    }

    try {
      await updateProperty({ propertyId: Number(id), formData }).unwrap();
      toast.success('Property updated successfully!');
      refetch();
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update property.');
    }
  };

  const handleSendMessage = async () => {
    if (messageContent.trim() === '') return alert('Please enter a message before sending.');
    try {
      await SendMessage({
        userID: Number(userId),
        receiverId: Number(property?.landlordId),
        message: messageContent,
      });

      setMessages((prev) => [
        ...prev,
        {
          content: messageContent,
          senderName: username.name,
          timestamp: new Date().toISOString(),
        },
      ]);

      setMessageContent('');
      setShowChat(false)
      toast.success('Message Sent')
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append(`Image`, file);

      addPropertyAlbumImage({ propertyId: Number(id), formData });
      toast.success('Images uploaded successfully');
      refetch();
    }
  };


  const [RentProperty] = useRentPropertyMutation();
  const [DeleteRentProperty] = useDeleteRentPropertyMutation();
  const [deleteImage] = useDeletePropertyImageMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();
  const [SendMessage] = useSendMessageMutation()
  const [addPropertyAlbumImage] = useAddPropertyAlbumImageMutation();

  if (isLoading) return (
    <div className="loading">
      <BeatLoader
        className='BeatLoader'
        color="#0a81ed"
        size={50}
      />
    </div>
  )
  if (error || !property) return <p className="text-center mt-5 text-danger">You have to login</p>;

  return (
    <>
      <LogedHeader />
      <section id="RentalsDetails" className="py-4">
        <Container>
          <p className="text-muted">
            <Link to='/'>Home</Link> / <span className="text-dark">{property.title}</span>
          </p>
          <Row>
            {/* property imgs  */}
            <Col lg={2} md={2} sm={4}>
              <div className="d-flex flex-column gap-2">
                {property.propertyImages.map((propertyImage, index: number) => (
                  <div className="border p-1 position-relative" key={`${propertyImage.propertyImageId}-${index}`}>
                    {
                      userRole === 'landlord' && property.status === 'available' && Number(userId) === Number(property.landlordId) && (
                        <button
                          className='btn btn-light position-absolute top-0 end-0'
                          onClick={() => handleDeleteImage(propertyImage.propertyImageId)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      )
                    }
                    <img
                      src={getImageSrc(propertyImage.image)}
                      alt={property.title}
                      className="img-fluid w-100"
                    />
                  </div>
                ))}
                {userRole === 'landlord' && property.propertyImages.length < 4 && property.status === 'available' && Number(userId) === Number(property.landlordId) && (
                  <>
                    <button
                      className='btn btn-light'
                      onClick={() => selectedFile.current?.click()}
                    >
                      <i className="fa-solid fa-plus" style={{ fontSize: '3rem', padding: '2rem 0' }}></i>
                    </button>
                    <input
                      type="file"
                      ref={selectedFile}
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </div>
            </Col>

            <Col lg={5} md={5} sm={8}>
              <div className="text-center">
                <img
                  src={getImageSrc(property.mainImage)}
                  alt={property.title}
                  className="main-img"
                />
              </div>
            </Col>
            {/* property details  */}
            <Col lg={5} md={5} sm={8}>
              <div className="mt-3">
                <h3>{property.title}</h3>
                <h4 className="mt-3 text-success">${property.price}</h4>

                <div className="mt-3 d-flex align-items-center location-view">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <span>{property.location || 'Unknown Location'}</span>
                </div>

                <div className="mt-2 d-flex align-items-center location-view">
                  <i className="fas fa-eye text-primary me-2"></i>
                  <span>{property.views || 0} Views</span>
                </div>

                <div className="mt-2 d-flex align-items-center location-view">
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
                  {/* send message to landlord  */}
                  {userRole === 'tenant' && (
                    <>
                      <button onClick={handleShowChat} className={showChat ? `d-none` : `d-block btn text-primary`}>
                        <i className="fa-brands fa-rocketchat"></i>
                      </button>
                      <div className={!showChat ? `d-none` : `d-block d-flex ms-2`}>
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Type your message..."
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                        />
                        <button onClick={handleSendMessage} className="btn btn-primary mt-2">
                          Send
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-2 d-flex align-items-center location-view">
                  <i className="fas fa-calendar-alt text-primary me-2"></i>
                  <span>{property.createAt}</span>
                </div>

                <p className="mt-3">{property.description}</p>
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
                ) : property.status === 'rented' ? (
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <button className="btn Buy-Now btn-success">Rented</button>
                    <button onClick={handleShowComments} className="btn btn-outline-primary">
                      <i className="fas fa-comment"></i>
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-3 mt-3">
                    {userRole === 'tenant' && property.isAskForRent ? (
                      <button
                        className="btn Buy-Now btn-danger"
                        onClick={handleDeleteRent}
                      >
                        Rent is pending
                      </button>
                    ) : userRole === 'tenant' && (
                      <>
                        <button
                          className="btn Buy-Now btn-primary"
                          onClick={() => {

                            toast.info(
                              <>
                                Please upload a .txt file with the following format:
                                <br />
                                <br />
                                Line 1: Your salary
                                <br />
                                Line 2: Your SSN
                                <br />
                                Line 3: Your telephone number
                              </>,
                              {
                                autoClose: 10000,
                              }
                            );

                            fileInputRef.current?.click();
                          }}
                        >
                          Rent Now
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                      </>
                    )}
                    <button onClick={handleShowComments} className="btn btn-outline-primary">
                      <i className="fas fa-comment"></i>
                    </button>
                    {userRole === 'landlord' && Number(userId) === Number(property.landlordId) && (
                      <>
                        <button onClick={handleShowTenantRequests} className="btn btn-outline-primary">
                          <i className="fa-solid fa-clock-rotate-left"></i>
                        </button>
                        <button className="btn btn-outline-primary" onClick={openEditModal}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleDeleteProperty}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </>
                    )}
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
                <Comments propertyId={property.id} />
              </div>
              <div className={showTenantRequests ? 'd-block' : 'd-none'}>
                <TenantRequests />
              </div>
            </Col>
          </Row>
        </Container>

        {/* edit Modal */}
        {showEditModal && (
          <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Property</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formState.title}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Main Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setSelectedImage(file);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formState.price}
                        onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        value={formState.description}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                        style={{ height: '8rem' }}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                  <Button variant="primary" onClick={handleUpdateProperty}>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default RentalsDetails;
