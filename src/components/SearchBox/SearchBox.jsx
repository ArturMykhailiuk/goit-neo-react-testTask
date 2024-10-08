import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <label className={css.labelFind}>
      Find contacts
      <input
        type="text"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        className={css.inputFind}
      />
    </label>
  );
};

export default SearchBox;
