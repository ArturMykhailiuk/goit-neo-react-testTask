import { useParams } from "react-router-dom";
import css from "./Features.module.css";
import { useSelector } from "react-redux";
import { selectCampers } from "../../redux/campers/selectors";
import { selectCategory } from "../../redux/filters/selectors";

const Features = () => {
  const { id } = useParams();
  const campers = useSelector(selectCampers);
  const categories = useSelector(selectCategory);

  const camper = Array.isArray(campers)
    ? campers.find((camper) => camper.id === id)
    : null;

  return (
    <div className={css.features}>
      <div className={css.featuresList}>
        {Object.keys(categories).map(
          (category) =>
            camper[category] && (
              <button key={category} className={css.cardCategory}>
                <svg key={category} className={css.cardIcon}>
                  <use xlinkHref={`/public/sprite.svg#${category}`} />
                </svg>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
        )}
      </div>
      <div className={css.vehicleDetails}>
        <h3>Vehicle Details</h3>
        <ul className={css.detailsList}>
          <li className={css.detailItem}>
            <span>Form:</span>
            <span>
              {camper.form.charAt(0).toUpperCase() + camper.form.slice(1)}
            </span>
          </li>
          <li className={css.detailItem}>
            <span>Length:</span>
            <span>
              {camper.length.slice(0, -1) + " " + camper.length.slice(-1)}
            </span>
          </li>
          <li className={css.detailItem}>
            <span>Width:</span>
            <span>
              {camper.width.slice(0, -1) + " " + camper.width.slice(-1)}
            </span>
          </li>
          <li className={css.detailItem}>
            <span>Height:</span>
            <span>
              {camper.height.slice(0, -1) + " " + camper.height.slice(-1)}
            </span>
          </li>
          <li className={css.detailItem}>
            <span>Tank:</span>
            <span>
              {camper.tank.slice(0, -1) + " " + camper.tank.slice(-1)}
            </span>
          </li>
          <li className={css.detailItem}>
            <span>Consumption:</span>
            <span>{camper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
