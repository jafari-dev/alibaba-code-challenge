import "./styles.scss";
import { useMemo, useState, memo, useEffect } from "react";
import { CountryCard, Search, SelectBox } from "../../components";
import { areStringsMatched, reorderCountriesByFilter } from "../../utils";
import { ORDER_FILTER_OPTIONS, REGION_FILTER_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";


function Home({ countries }) {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const region = selectedRegion
      ? `region=${selectedRegion ? selectedRegion : "All"}`
      : "";

    const country = searchedValue ? `search=${searchedValue}` : "";
    const filters =
      region === "" || country === ""
        ? region + country
        : region + "&" + country;

    navigate(`${filters ? `?${filters}` : ""}`, { replace: true });
  }, [searchedValue, selectedRegion]);

  const shownCountries = useMemo(() => {
    const orderedCountries = reorderCountriesByFilter(countries, orderBy);

    return orderedCountries.filter((country) => {
      if (
        (["", "All"].includes(selectedRegion) ||
          country.region === selectedRegion) &&
        areStringsMatched(country.name, searchedValue)
      )
        return true;

      return false;
    });
  }, [countries, searchedValue, selectedRegion, orderBy]);

  return (
    <>
      <nav className="filters">
        <Search searchValue={searchedValue} onChange={setSearchedValue} />
        <SelectBox
          options={ORDER_FILTER_OPTIONS}
          onChange={setOrderBy}
          placeholder="Order by ..."
        />
        <SelectBox
          options={REGION_FILTER_OPTIONS}
          onChange={setSelectedRegion}
          placeholder="Region"
        />
      </nav>
      <section className="countries">
        {shownCountries.map((country) => (
          <CountryCard
            key={country.name}
            name={country.name}
            capital={country.capital}
            population={country.population}
            region={country.region}
            flagUrl={country.flag}
          />
        ))}
      </section>
    </>
  );
}

export default memo(Home);
