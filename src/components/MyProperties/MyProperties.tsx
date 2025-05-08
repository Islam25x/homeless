import { useEffect } from "react";
import { useGetTenantPropertyQuery } from "../RTK/RentalRequestApi/RentalRequestApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getImageSrc } from "../../utils/imageHelpers"
import { MyProperty } from "../../types/MyProperty";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PendingRentals from "../PendingRentals/PendingRentals";
import LogedHeader from "../Headers/LogedHeader/LogedHeader";

function MyProperties() {
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


    const AcceptedProperty = myProperty?.filter((property: MyProperty) => property.rentStatus === "accepted");

    return (
        <>
            <LogedHeader />
            <section id="Posts">
                <Container>
                    <h2 className="text-center my-4">My Rentals</h2>
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
                            {AcceptedProperty?.map((property: MyProperty) => (
                                <SwiperSlide key={property.rentId}>
                                    <Link to={`/RentalsDetails/${property.propertyId}`}>
                                        <div className="post-card">
                                            <img
                                                src={getImageSrc(property.propertyMainImage)}
                                                alt={property.propertyTitle}
                                                className="post-image"
                                            />
                                            <div className="text-center mt-2">
                                                <h5>{property.propertyTitle}</h5>
                                                <p>{property.location}</p>
                                                <p>Price: ${property.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </Container>
                <hr style={{ color: "gray" }} />
            </section>
            <PendingRentals />
        </>
    );
}

export default MyProperties;
