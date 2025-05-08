import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetPropertiesQuery } from "../../RTK/PropertySlice/apiSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect } from "react";
import { getImageSrc } from "../../../utils/imageHelpers";
import { Property } from "../../../types/Property";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Posts.css';



function Posts() {
  const { data: properties = [], isLoading, error, refetch, isSuccess } = useGetPropertiesQuery();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);
  const pendingPosts = properties?.filter((property: Property) => property.propertyApproval === 'pending')
  return (
    <section id="Posts">
      <Container>
        <h2 className="text-center my-4">Pending Rentals</h2>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">Error loading properties.</p>
        ) : properties.length === 0 ? (
          <p className="text-center">No properties found.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {pendingPosts?.map((property: Property) => (
              <SwiperSlide key={property.id}>
                <Link to={`/RentalsDetails/${property.id}`}>
                  <div className="post-card">
                    <img
                      src={getImageSrc(property.mainImage)}
                      alt={property.title}
                      className="post-image"
                    />
                    <div className="text-center mt-2">
                      <h5>{property.title}</h5>
                      <p>{property.location}</p>
                      <p>Price: ${property.price}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <hr style={{ color: "gray" }} />
      </Container>
    </section>
  );
}

export default Posts;
