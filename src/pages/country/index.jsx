import { memo, useEffect, useMemo } from "react";
import { ArrowLeft } from "../../assets";
import { Link, useLocation } from "react-router-dom";

function Country({ countries }) {
  const location = useLocation();
  
  const urlMatchedCountry = useMemo(() => {
    const decodedPath = window.decodeURIComponent(location.pathname);
    const cleanPath = decodedPath.toLowerCase().replace(/^\/|\/$/g, "");
    const [majorPath = "", minorPath = "#NONE"] = cleanPath.split("/");
    if (majorPath === "countries") {
      return countries.find(({ name }) => name.toLowerCase() === minorPath);
    }
  }, [location.pathname, countries.length]);

  useEffect(() => {
    async function loadStyles() {
      await import("./styles.scss");
    }

    loadStyles();
  }, []);

  if (urlMatchedCountry == null) {
    return <div>No country exist with this name!</div>;
  } else {
    const {
      name,
      flag,
      capital,
      nativeName,
      subregion,
      population,
      region,
      languages,
      currencies,
      topLevelDomain,
      borders,
    } = urlMatchedCountry;

    return (
      <section className="country-container">
        <Link to="/" className="back-button">
          <ArrowLeft />
          <span>Back</span>
        </Link>
        <div className="content">
          <img src={flag} alt={`Flag of ${name}`} />
          <article className="details">
            <h3>{name}</h3>
            <ul>
              <li>
                <span>Native Name:</span>
                <span>{nativeName}</span>
              </li>
              <li>
                <span>Top Level Domain:</span>
                <span>{topLevelDomain[0]}</span>
              </li>
              <li>
                <span>Population:</span>
                <span>{population}</span>
              </li>
              <li>
                <span>Currencies:</span>
                <span>
                  {currencies.map((currency) => (
                  <span key={currency.name}>{currency.name}</span>
                ))}
                </span>
              </li>
              <li>
                <span>Region:</span>
                <span>{region}</span>
              </li>
              <li>
                <span>Languages:</span>
                <span>
                  {languages.map((language) => (
                  <span key={language.name}>{language.name}</span>
                ))}
                </span>
              </li>
              <li>
                <span>Sub Region:</span>
                <span>{subregion}</span>
              </li>
              <li>
                <span>Capital:</span>
                <span>{capital}</span>
              </li>
            </ul>
            <div className="borders">
              <span>Border Countries:</span>
              {borders?.map((border) => {
                const countryName = countries.find((country) => country.alpha3Code === border).name;

                return (
                  <Link key={border} to={`/countries/${countryName}`}>{countryName}</Link>
                )
              })}
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default memo(Country);
