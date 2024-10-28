import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import {
  selectFilteredCampers,
  selectCategory,
} from "../../redux/filters/selectors";

import css from "./CamperCard.module.css";

const CamperCard = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites.favorites);
  const categories = useSelector(selectCategory);
  const campers = useSelector(selectFilteredCampers);

  const camper = Array.isArray(campers)
    ? campers.find((camper) => camper.id === id)
    : null;

  const handleShowMore = () => {
    navigate(`/catalog/${id}`);
  };

  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(camper));
    } else {
      dispatch(addFavorite(camper));
    }
  };

  if (!camper) {
    return null;
  }

  return (
    <div className={css.card}>
      <img
        src={camper.gallery[0].thumb}
        alt={camper.name}
        className={css.cardImg}
      />
      <div className={css.cardInfo}>
        <div className={css.cardInfo1}>
          <h2 className={css.cardHeader}>{camper.name}</h2>
          <div className={css.cardPriceFav}>
            <h2 className={css.cardHeader}>
              {camper.price.toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </h2>
            <button className={css.cardFavBtn} onClick={handleFavorite}>
              <svg
                className={`${css.iconHeart} ${
                  isFavorite ? css.favorited : ""
                }`}
              >
                <use xlinkHref="/sprite.svg#heart" />
              </svg>
            </button>
          </div>
        </div>
        <div className={css.cardInfo2}>
          <div className={css.cardRating}>
            <svg className={css.cardIconRating}>
              <use xlinkHref="/sprite.svg#rating" />
            </svg>
            <span>
              {camper.rating}({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={css.cardRating}>
            <svg className={css.cardIconMap}>
              <use xlinkHref="/sprite.svg#map" />
            </svg>
            <span>{camper.location}</span>
          </div>
        </div>
        <p className={css.cardDescription}>
          {camper.description.slice(0, 100) + "..."}
        </p>
        <div className={css.cardGroup}>
          <div className={css.cardCategories}>
            <div className={css.cardCategoriesRow}>
              {Object.keys(categories)
                .slice(0, 9)
                .map(
                  (category) =>
                    camper[category] && (
                      <button key={category} className={css.cardCategory}>
                        <svg key={category} className={css.cardIcon}>
                          <use xlinkHref={`/sprite.svg#${category}`} />
                        </svg>
                        {category === "transmission"
                          ? camper[category].charAt(0).toUpperCase() +
                            camper[category].slice(1)
                          : category.charAt(0).toUpperCase() +
                            category.slice(1)}
                      </button>
                    )
                )}
            </div>
          </div>
        </div>
        <button onClick={handleShowMore} className={css.showMoreBtn}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
