import "./styles.scss";
import { memo, useCallback } from "react";
import { Search as SearchIcon } from "../../assets";

function Search({ searchValue, onChange }) {
  const handleChangeValue = useCallback(
    (event) => {
      const value = event.currentTarget.value;
      onChange(value);
    },
    [onChange]
  );

  return (
    <div className="search">
      <SearchIcon />
      <input
        placeholder="Search for a country ..."
        value={searchValue}
        onChange={handleChangeValue}
      />
    </div>
  );
}

export default memo(Search);
