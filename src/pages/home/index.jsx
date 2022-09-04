import "./styles.scss";
import { useMemo, useState, memo, useEffect } from "react";
import { CountryCard, Search, SelectBox, SortBox } from "../../components";
import { areStringsMatched, orderObjectsByProperty } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const REGION_FILTER_OPTIONS = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

const ORDER_FILTERS = {
  name: {
    ASC: "Country name (Asc)",
    DES: "Country name (Des)"
  },
  population: {
    ASC: "Population (Asc)",
    DES: "Population (Des)"
  }
}

const ORDER_FILTER_LABELS = Object.values(ORDER_FILTERS)
  .map((value) => Object.values(value)).flat();

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
    const filters = region === "" || country === ""
      ? region + country
      : region + "&" + country;

    navigate(`${filters ? `?${filters}` : ""}`, { replace: true });
  }, [searchedValue, selectedRegion]);

  const shownCountries = useMemo(() => {
    let orderedCountries = orderBy === ORDER_FILTERS.name.ASC
      ? orderObjectsByProperty(countries, "name", "ASC")
      : orderBy === ORDER_FILTERS.name.DES
        ? orderObjectsByProperty(countries, "name", "DES")
        : orderBy === ORDER_FILTERS.population.ASC
          ? orderObjectsByProperty(countries, "population", "ASC")
          : orderBy === ORDER_FILTERS.population.DES
            ? orderObjectsByProperty(countries, "population", "DES")
            : orderObjectsByProperty(countries, "");
    

    return orderedCountries.filter((country) => {
      if (
        (["", "All"].includes(selectedRegion) ||
        country.region === selectedRegion) &&
        areStringsMatched(country.name, searchedValue)
      ) return true;
      
      return false;
    });
  }, [countries, searchedValue, selectedRegion, orderBy]);

  return (
    <>
      <nav className="filters">
        <Search searchValue={searchedValue} onChange={setSearchedValue} />
        <SelectBox
          options={ORDER_FILTER_LABELS}
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
