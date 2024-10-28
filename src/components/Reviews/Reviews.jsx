import css from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors";

const Reviews = () => {
  const { id } = useParams();
  const campers = useSelector(selectCampers);

  const camper = Array.isArray(campers)
    ? campers.find((camper) => camper.id === id)
    : null;
  return (
    <div className={css.reviews}>
      <ul className={css.reviewsList}>
        {camper.reviews.map((review, index) => (
          <li key={index} className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <button className={css.reviewerAvatar}>
                {review.reviewer_name.charAt(0)}
              </button>
              <div className={css.reviewerRating}>
                <span className={css.reviewText}>{review.reviewer_name}</span>
                <span className={css.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`${
                        i < review.reviewer_rating ? css.filled : css.starIcon
                      }`}
                    >
                      <use xlinkHref="/public/sprite.svg#Rating" />
                    </svg>
                  ))}
                </span>
              </div>
            </div>
            <p className={css.reviewText}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
