import "./styles.scss";
import { memo, useCallback } from "react";


function SelectBox({options, onChange, placeholder}) {
  const changeSelectedOption = useCallback((event) => {
    const value = event.target.value;
    onChange(value);
  }, [onChange]);

  return (
    <select defaultValue="" className="selectbox" data-testid="selectbox" name="select" onChange={changeSelectedOption}>
      <option data-testid="option" disabled value="">{placeholder}</option>
      {options.map((option) => (
        <option data-testid="option" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default memo(SelectBox);
