import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";
import bannerwebp from "../../assets/banner.webp";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNow = () => {
    navigate("/catalog");
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={css.homePage}>
      <img
        src={bannerwebp}
        alt="Camper in the forest"
        className={css.bannerImg}
      />
      <div className={css.banner}>
        <h1>Campers of your dreams</h1>
        <h2>You can find everything you want in our catalog</h2>
        <button onClick={handleViewNow} className={css.viewBtn}>
          View Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
