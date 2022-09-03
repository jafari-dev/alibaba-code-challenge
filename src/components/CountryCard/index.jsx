import { memo } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function CountryCard({name, flagUrl, population, region, capital}) {
  return (
    <div className="country-card">
      <img src={flagUrl} alt={`Flag of ${name}`} />
      <Link to={`/countries/${name.toLowerCase()}`}>
        <h3 data-testid="name">{name}</h3>
      </Link>
      <h4>
        <span>Population:</span>
        <span data-testid="population">{population}</span>
      </h4>
      <h4>
        <span>Region:</span>
        <span data-testid="region">{region}</span>
      </h4>
      <h4>
        <span>Capital:</span>
        <span data-testid="capital">{capital}</span>
      </h4>
    </div>
  )
}

export default memo(CountryCard);
