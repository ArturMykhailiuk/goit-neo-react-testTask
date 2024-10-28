import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

import {
  selectVisibleCount,
  selectLoading,
  selectError,
} from "../../redux/campers/selectors";

import { fetchCampers } from "../../redux/campers/operations";
import { incrementVisibleCount } from "../../redux/campers/slice";
import { selectFilteredCampers } from "../../redux/filters/selectors";
import Filters from "../../components/Filters/Filters";
import CamperCard from "../../components/CamperCard/CamperCard";

import css from "./CatalogPage.module.css";
import { toast, ToastContainer } from "react-toastify";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const campers = useSelector(selectFilteredCampers);
  const visibleCount = useSelector(selectVisibleCount);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.add("scroll");
    return () => {
      document.body.classList.remove("scroll");
    };
  }, []);

  const handleLoadMore = () => {
    dispatch(incrementVisibleCount());
  };

  useEffect(() => {
    if (visibleCount > 4) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleCount]);

  useEffect(() => {
    if (visibleCount >= campers.length && campers.length > 0) {
      toast.info("All campers have been loaded.");
    }
  }, [visibleCount, campers.length]);

  return (
    <div className={css.catalogPage}>
      <div className={css.filterblock}>
        <Filters />
      </div>
      <div className={css.camperList}>
        {isLoading && (
          <div>
            <ColorRing
              className={css.loader}
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
        {error && <h1 className={css.loader}>Oops...Something went wrong!</h1>}
        {campers.slice(0, visibleCount).map((camper) => (
          <CamperCard key={camper.id} id={camper.id} />
        ))}
        {visibleCount < campers.length ? (
          <div>
            <button className={css.loadMore} onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        ) : (
          <ToastContainer />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
