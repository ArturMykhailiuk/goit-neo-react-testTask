import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setFilters,
  resetFilters,
  initialState,
} from "../../redux/filters/slice";
import { resetCampers, resetVisibleCount } from "../../redux/campers/slice";
import { fetchCampers } from "../../redux/campers/operations";
import css from "./Filters.module.css";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Filters = () => {
  const dispatch = useDispatch();

  const [choosedFilters, setNewChoice] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : initialState;
  });

  const prevFiltersRef = useRef(choosedFilters);

  useEffect(() => {
    prevFiltersRef.current = choosedFilters;
    localStorage.setItem("filters", JSON.stringify(choosedFilters));
  }, [choosedFilters]);

  const handleLocationChange = (e) => {
    const updatedFilter = {
      ...choosedFilters,
      ["location"]: e.target.value,
    };
    setNewChoice(updatedFilter);
  };

  const handleEquipmentChange = (key) => {
    setNewChoice((choosedFilters) => ({
      ...choosedFilters,
      equipments: {
        ...choosedFilters.equipments,
        [key]:
          key === "transmission" && choosedFilters.equipments[key] === ""
            ? "automatic"
            : key === "transmission" &&
              choosedFilters.equipments[key] === "automatic"
            ? ""
            : !choosedFilters.equipments[key],
      },
    }));
  };

  const handleFormChange = (key) => {
    setNewChoice((choosedFilters) => ({
      ...choosedFilters,
      forms: {
        ...choosedFilters.forms,
        [key]: !choosedFilters.forms[key],
      },
    }));
  };

  const handleApplyFilters = () => {
    {
      if (
        choosedFilters.location.length >= 1 &&
        choosedFilters.location.length < 3
      ) {
        toast.error("Please enter minimum 3 characters for Location filter");
      } else {
        dispatch(resetFilters()); //reset filters in store
        dispatch(resetCampers());
        dispatch(setFilters(choosedFilters));
        dispatch(fetchCampers());
        dispatch(resetVisibleCount()); // Скидання кількості видимих карток до 4
      }
    }
  };

  /*Add filters for equipment and type*/
  const equipmentKeys = ["AC", "transmission", "kitchen", "TV", "bathroom"];
  const typeKeys = ["panelTruck", "fullyIntegrated", "alcove"];

  return (
    <div className={css.filters}>
      <ToastContainer />
      <label className={css.locationLabel}>
        Location
        <div className={css.locationGroup}>
          <button className={css.locationBtn}>
            <svg className={css.locationIcon}>
              <use xlinkHref="/sprite.svg#map" />
            </svg>
          </button>
          <input
            type="text"
            value={choosedFilters.location}
            onChange={handleLocationChange}
            placeholder="City"
          />
        </div>
      </label>
      <h3>Filters</h3>
      <label className={css.filterLabel}>Vehicle equipment</label>
      <div className={css.filterGroup}>
        {Object.keys(choosedFilters.equipments)
          .filter((key) => equipmentKeys.includes(key))
          .map((filter) => (
            <div key={filter}>
              <button
                onClick={() => handleEquipmentChange(filter)}
                className={`${css.filterBtn} ${
                  choosedFilters.equipments[filter] ||
                  choosedFilters.equipments[filter] === "automatic"
                    ? css.checked
                    : ""
                }`}
              >
                <svg className={css.icon}>
                  <use xlinkHref={`/sprite.svg#${filter}`} />
                </svg>
                {filter === "transmission"
                  ? "Automatic"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            </div>
          ))}
      </div>
      <label className={css.filterLabel}>Vehicle type</label>
      <div className={css.filterGroup}>
        {Object.keys(choosedFilters.forms)
          .filter((key) => typeKeys.includes(key))
          .map((filter) => (
            <div key={filter}>
              <button
                onClick={() => handleFormChange(filter)}
                className={`${css.filterBtn} ${
                  choosedFilters.forms[filter] ? css.checked : ""
                }`}
              >
                <svg className={css.icon}>
                  <use xlinkHref={`/sprite.svg#${filter}`} />
                </svg>
                {filter === "fullyIntegrated"
                  ? "Fully Integrated"
                  : filter === "panelTruck"
                  ? "Van"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            </div>
          ))}
      </div>
      <button onClick={handleApplyFilters} className={css.searchBtn}>
        Search
      </button>
    </div>
  );
};
export default Filters;
