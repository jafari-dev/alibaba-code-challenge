import "./App.scss";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./components";
import { HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";


function App() {
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
        const minimalData = data.map((country) => ({
          code: country.alpha3Code,
          nativeName: country.nativeName,
          name: country.name,
          capital: country.capital,
          region: country.region,
          population: country.population,
          subregion: country.subregion,
          borders: country.borders,
          currencies: country.currencies,
          languages: country.languages,
          flag: country.flag
        }));

        setCountries(minimalData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <Header isDarkThemeOn={isDarkThemeOn} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage countries={countries} />} />
        <Route path="/countries/:name" element={<div>Country page</div>} />
      </Routes>
    </div>
  );
}

export default App;
