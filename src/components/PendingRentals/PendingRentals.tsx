import { useEffect } from "react";
import { useGetTenantPropertyQuery } from "../RTK/RentalRequestApi/RentalRequestApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getImageSrc } from "../../utils/imageHelpers"
import { MyProperty } from "../../types/MyPropertyType";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from "react-bootstrap";

function PendingRentals() {
    const userId = localStorage.getItem("userId") || "";
    const { data: myProperty = [], isLoading: isMyPropertyLoading, isError: isMyPropertyError, isSuccess, refetch } = useGetTenantPropertyQuery({
        tenantId: Number(userId)
    });

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess, refetch]);
    console.log(myProperty);


    const pendingRentals = myProperty?.filter((property: MyProperty) => property.rentStatus === "pending");

    if (pendingRentals.length === 0) {
        return (
            <>
                <Container>
                    <h2 className="text-center my-4">My Rentals</h2>
                    <p className="text-center">you don`t have pending rentals</p>
                </Container>
            </>
        );
    }

    return (
        <section id="Posts">
            <Container>
                <h2 className="text-center my-4">pending Rentals</h2>
                {isMyPropertyLoading ? (
                    <p className="text-center">Loading...</p>
                ) : isMyPropertyError ? (
                    <p className="text-center text-danger">Error loading properties.</p>
                ) : myProperty.length === 0 ? (
                    <p className="text-center">No properties found.</p>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={40}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1200: { slidesPerView: 4 },
                        }}
                    >
                        {pendingRentals?.map((property: MyProperty) => (
                            <SwiperSlide key={property.rentId}>
                                <Link to={`/RentalsDetails/${property.propertyId}`}>
                                    <div className="post-card">
                                        <img
                                            src={getImageSrc(property.propertyMainImage)}
                                            alt={property.propertyTitle}
                                            className="post-image"
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
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Container>
        </section>
    );
}

export default PendingRentals;
