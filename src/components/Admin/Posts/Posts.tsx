import { Container, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetPropertiesQuery } from "../../RTK/PropertySlice/apiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { getImageSrc } from "../../../utils/imageHelpers";
import { Property } from "../../../types/Property";
import PostsHistory from "./PostsHistory/PostsHistory";

import "swiper/css";
import "swiper/css/pagination";
import "./Posts.css";

function Posts() {
  const { data, isLoading, error, refetch, isSuccess } = useGetPropertiesQuery();
  const [properties, setProperties] = useState<Property[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (data) {
      setProperties(data);
    }
    refetch();
  }, [data, refetch]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const pendingPosts = properties.filter(
    (property: Property) => property.propertyApproval === "pending"
  );

  return (
    <section id="Posts" className="my-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">{showHistory ? "Posts History" : "Pending Rentals"}</h2>
          <button className="History-btn" onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? "Back to Pending" : "History"}
          </button>
        </div>

        {showHistory ? (
          <PostsHistory />
        ) : isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            Error loading properties.
          </Alert>
        ) : pendingPosts.length === 0 ? (
          <Alert variant="info" className="text-center">
            No pending rentals found.
          </Alert>
        ) : (
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {pendingPosts.map((property: Property) => (
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
      </Container>
    </section>
  );
}

export default Posts;
