import PropTypes from "prop-types";
import css from "./SearchBox.module.css";
const SearchBox = ({ filter, onFilterChange }) => {
  return (
    <>
      <label>Find contacts by name</label>
      <input
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className={css.searchBox}
      />
    </>
  );
};

SearchBox.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchBox;
