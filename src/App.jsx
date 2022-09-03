import "./App.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CountryCard, Header, Search, SelectBox } from "./components";
import { Routes, Route } from "react-router-dom";

const REGION_FILTER_OPTIONS = [
  "All",
  "Africa",
  "America",
  "Asia",
  "Europe",
  "Oceania",
];

function App() {
  const [searchedValue, setSearchedValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);
  const toggleTheme = useCallback(() => {
    setIsDarkThemeOn((previousState) => !previousState);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const URL = "https://restcountries.com/v2/all";

      try {
        const response = fetch(URL);
        const data = await (await response).json();

        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

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
    <div className="container">
      <Header isDarkThemeOn={isDarkThemeOn} onToggleTheme={toggleTheme} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <nav className="filters">
                <Search
                  searchValue={searchedValue}
                  onChange={setSearchedValue}
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
          }
        />
        <Route path="/countries/:name" element={<div>Country page</div>} />
      </Routes>
    </div>
  );
}

export default App;
