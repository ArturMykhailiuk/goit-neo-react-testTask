import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <div>
        <svg className={css.logoIcon}>
          <use xlinkHref="/sprite.svg#logo" />
        </svg>
      </div>
      <div className={css.linkFlex}>
        <ul className={css.navLinks}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/catalog">Catalog</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
