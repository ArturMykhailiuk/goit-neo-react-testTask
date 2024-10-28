import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useLocation,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchCamperById } from "../../redux/campers/operations";
import {
  selectCamperById,
  selectLoading,
  selectError,
} from "../../redux/campers/selectors";
import bannerwebp from "../../assets/banner.webp";
import css from "./CamperDetailPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";

const CamperDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const camper = useSelector((state) => selectCamperById(state, id));
  const [initialLoad, setInitialLoad] = useState(true);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (location.pathname.endsWith(id) && initialLoad) {
      setInitialLoad(false);
    }
  }, [location, id, initialLoad]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading camper details: {error}</div>;
  }

  if (!camper) {
    return <div>No camper found</div>;
  }

  return (
    <div className={css.detailPage}>
      <h2 className={css.detailName}>{camper.name}</h2>
      <div className={css.detailInfo1}>
        <div className={css.detailRating}>
          <svg className={css.detailIconRating}>
            <use xlinkHref="/sprite.svg#rating" />
          </svg>
          <Link to="reviews" className={css.detailRatingLink}>
            {camper.rating}({camper.reviews.length} Reviews)
          </Link>
        </div>
        <div className={css.detailRating}>
          <svg className={css.detailIconMap}>
            <use xlinkHref="/sprite.svg#map" />
          </svg>
          <span>{camper.location}</span>
        </div>
      </div>
      <div>
        <span className={css.detailName}>
          {camper.price.toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
        </span>
      </div>
      <div className={css.detailGallery}>
        {camper.gallery.map((item, index) => (
          <div key={item.id || index} className={css.galleryItem}>
            <img
              src={item.thumb}
              alt={`${camper.name} ${index + 1}`}
              className={css.detailImg}
            />
          </div>
        ))}
        <div className={css.galleryItem}>
          <img
            src={bannerwebp}
            alt="Additional image"
            className={css.detailImg}
          />
        </div>
      </div>
      <p className={css.detailDesc}>{camper.description}</p>
      <nav className={css.featuresReviews}>
        <Link to="features" className={css.additionalLinks}>
          Features
        </Link>
        <Link to="reviews" className={css.additionalLinks}>
          Reviews
        </Link>
      </nav>
      <div className={css.outletBooking}>
        <div className={css.outlet}>
          {initialLoad && location.pathname.endsWith(id) && (
            <Navigate to="features" replace />
          )}
          <Outlet />
        </div>
        <div className={css.bookingForm}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailPage;
