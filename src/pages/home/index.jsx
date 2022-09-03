import "./styles.scss";
import { useMemo, useState, memo } from "react";
import { CountryCard, Search, SelectBox } from "../../components";

const REGION_FILTER_OPTIONS = [
  "All",
  "Africa",
  "America",
  "Asia",
  "Europe",
  "Oceania",
];

function Home({ countries }) {
  const [searchedValue, setSearchedValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const shownCountries = useMemo(() => {
    return countries.filter((country) => {
      const allRegionsFilters = ["", "All"];
      const areRegionsMatched = allRegionsFilters.includes(selectedRegion)
        ? true
        : country.region === selectedRegion;
      const areNameAndSearchMatched = country.name
        .toUpperCase()
        .includes(searchedValue.toUpperCase());

      if (areRegionsMatched && areNameAndSearchMatched) return true;
      else return false;
    });
  }, [countries, searchedValue, selectedRegion]);

  return (
    <>
      <nav className="filters">
        <Search searchValue={searchedValue} onChange={setSearchedValue} />
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
